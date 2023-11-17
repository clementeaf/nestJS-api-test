/* eslint-disable @typescript-eslint/no-unused-vars */
// application/github/github.service.ts

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GitHubConnection } from '../../infrastructure/github/github/github';
import { CommitDto, RepoInfoDto } from './github.dto/github.dto';
import { Subject } from 'rxjs';
@Injectable()
export class ApplicationGithubService {
  private readonly gitHubConnection: GitHubConnection;
  private commitsSubject = new Subject<CommitDto[]>();

  constructor() {
    this.gitHubConnection = new GitHubConnection();
  }

  /**
   * Get repository information.
   * @returns {Promise<RepoInfoDto>} Repository information.
   * @throws {NotFoundException} If the repository is not found.
   * @throws {InternalServerErrorException} If an internal server error occurs.
   */
  async getRepoInfo(): Promise<RepoInfoDto> {
    const owner = 'clementeaf';
    const repo = 'nestJS-api-test';

    try {
      const repoInfo = await this.gitHubConnection.getRepoInfo(owner, repo);

      if (!repoInfo) {
        throw new NotFoundException('Repository not found');
      }

      const repoInfoDto: RepoInfoDto = {
        name: repoInfo.name,
      };

      return repoInfoDto;
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        this.handleError(error, 'Error fetching repository information');
      } else {
        throw new InternalServerErrorException(
          'Unexpected error fetching repository information',
        );
      }
    }
  }

  /**
   * Get list of commits.
   * @returns {Promise<CommitDto[]>} List of commits.
   * @throws {NotFoundException} If commits are not found.
   * @throws {InternalServerErrorException} If an internal server error occurs.
   */
  async getCommits(): Promise<CommitDto[]> {
    const owner = 'clementeaf';
    const repo = 'nestJS-api-test';

    try {
      const commits = await this.gitHubConnection.getCommits(owner, repo);

      if (!commits) {
        throw new NotFoundException('Commits not found');
      }

      const commitsDto: CommitDto[] = commits.map(
        (commit: { sha: string }) => ({
          sha: commit.sha,
        }),
      );

      return commitsDto;
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        this.handleError(error, 'Error fetching commits');
      } else {
        throw new InternalServerErrorException(
          'Unexpected error fetching commits',
        );
      }
    }
  }

  async getCommitsAndNotify(): Promise<CommitDto[]> {
    const owner = 'clementeaf';
    const repo = 'nestJS-api-test';
    try {
      const commits = await this.gitHubConnection.getCommits(owner, repo);

      if (!commits) {
        throw new NotFoundException('Commits not found');
      }

      const commitsDto: CommitDto[] = commits.map(
        (commit: { sha: string }) => ({
          sha: commit.sha,
        }),
      );

      // Notify the subscribers about the commits update
      this.commitsSubject.next(commitsDto);

      return commitsDto;
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        this.handleError(error, 'Error fetching commits');
      } else {
        throw new InternalServerErrorException(
          'Unexpected error fetching commits',
        );
      }
    }
  }

  /**
   * Handles errors in the GitHub service by logging the error and throwing
   * an InternalServerErrorException with a custom error message.
   *
   * @param error - The error object.
   * @param message - Custom error message to include in the exception.
   * @throws {InternalServerErrorException} Always throws an InternalServerErrorException.
   */
  private handleError(error: Error, message: string): never {
    console.error(error);

    /**
     * Throws an InternalServerErrorException with a custom error message.
     */
    throw new InternalServerErrorException(message);
  }

  // Method to subscribe to commit updates
  getCommitsUpdates() {
    return this.commitsSubject.asObservable();
  }
}
