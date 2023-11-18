/* eslint-disable @typescript-eslint/no-unused-vars */
// application/github/github.service.ts

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GitHubConnection } from '../../infrastructure/github/github/github';
import {
  CommitAuthorDto,
  CommitDto,
  RepoInfoDto,
} from './github.dto/github.dto';
import { Subject } from 'rxjs';
@Injectable()
export class ApplicationGithubService {
  private readonly gitHubConnection: GitHubConnection;
  private commitsSubject = new Subject<CommitDto[]>();

  private readonly owner = 'clementeaf';
  private readonly repo = 'nestJS-api-test';
  private authorDto = new CommitAuthorDto();

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
    try {
      const repoInfo = await this.gitHubConnection.getRepoInfo(
        this.owner,
        this.repo,
      );

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
    try {
      const commits = await this.gitHubConnection.getCommits(
        this.owner,
        this.repo,
      );

      if (!commits) {
        throw new NotFoundException('Commits not found');
      }

      const commitsDto: CommitDto[] = commits.map((commit) => ({
        sha: commit.sha,
        author: {
          name: this.authorDto.name,
          email: this.authorDto.email,
          date: this.authorDto.date,
        },
      }));

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
      const commits = await this.gitHubConnection.getCommits(
        this.owner,
        this.repo,
      );

      if (!commits) {
        throw new NotFoundException('Commits not found');
      }

      const authorDto = new CommitAuthorDto();

      const commitsDto: CommitDto[] = commits.map((commit) => ({
        sha: commit.sha,
        author: {
          name: this.authorDto.name,
          email: this.authorDto.email,
          date: this.authorDto.date,
        },
      }));

      /**
       * Notify the subscribers about the commits update
       */
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

  //Solo prueba
  async getCommitsWithDetails(): Promise<any[]> {
    try {
      const commits = await this.gitHubConnection.getCommitsWithDetails(
        this.owner,
        this.repo,
      );

      if (!commits) {
        throw new NotFoundException('Commits not found');
      }

      return commits;
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        this.handleError(error, 'Error fetching commits with details');
      } else {
        throw new InternalServerErrorException(
          'Unexpected error fetching commits with details',
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

  /**
   * Method to subscribe to commit updates
   */
  getCommitsUpdates() {
    return this.commitsSubject.asObservable();
  }
}
