/* eslint-disable @typescript-eslint/no-unused-vars */
// application/github/github.service.ts

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Subject } from 'rxjs';
import { CommitDto, RepoInfoDto } from '../dto/github.dto';
import { Commit } from '../dto/interfaces.dto';
import { GitHubConnection } from '../../../infrastructure/github-connection.service';

@Injectable()
export class ApplicationGithubService {
  private readonly gitHubConnection: GitHubConnection;
  private commitsSubject = new Subject<CommitDto[]>();

  private readonly owner = 'clementeaf';
  private readonly repo = 'nestJS-api-test';

  constructor() {
    this.gitHubConnection = new GitHubConnection();
  }

  /**
   * Get repository information.
   * @returns {Promise<RepoInfoDto>} Repository information.
   * @throws {NotFoundException} If the repository is not found.
   * @throws {InternalServerErrorException} If an internal server error occurs.
   */
  async fetchRepositoryInfo(): Promise<RepoInfoDto> {
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
        owner: {
          login: repoInfo.owner.login,
          url: repoInfo.owner.url,
        },
        html_url: repoInfo.html_url,
        created_at: repoInfo.created_at,
        updated_at: repoInfo.updated_at,
        language: repoInfo.language,
        visibility: repoInfo.visibility,
        default_branch: repoInfo.default_branch,
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
  async fetchCommitsFromGithub(): Promise<Commit[]> {
    try {
      const commits = await this.gitHubConnection.getCommits(
        this.owner,
        this.repo,
      );

      if (!commits) {
        throw new NotFoundException('Commits not found');
      }
      const commitDtos: CommitDto[] = commits.map((commit) => {
        return {
          sha: commit.sha,
          commit: {
            author: {
              name: commit.commit.author.name,
              email: commit.commit.author.email,
              date: commit.commit.author.date,
            },
            message: commit.commit.message,
          },
        } as CommitDto;
      });

      return commitDtos;
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
   * Fetches commits from the GitHub API, notifies subscribers about updates,
   * and returns a list of CommitDto objects.
   *
   * @returns {Promise<CommitDto[]>} List of commits.
   * @throws {NotFoundException} If commits are not found.
   * @throws {InternalServerErrorException} If an unexpected error occurs.
   */
  async notifyCommitsUpdate(): Promise<CommitDto[]> {
    // GitHub repository information
    const owner = 'clementeaf';
    const repo = 'nestJS-api-test';

    try {
      // Fetch commits from the GitHub API
      const commits = await this.gitHubConnection.getCommits(owner, repo);

      // Check if commits are not found
      if (!commits || commits.length === 0) {
        throw new NotFoundException('Commits not found');
      }

      // Map GitHub commits to CommitDto objects
      const commitDtos: CommitDto[] = commits.map((commit) => {
        return {
          sha: commit.sha,
          commit: {
            author: {
              name: commit.commit.author.name,
              email: commit.commit.author.email,
              date: commit.commit.author.date,
            },
          },
        } as CommitDto;
      });

      /**
       * Notify the subscribers about the commits update.
       * This ensures that subscribers are informed of the latest commits.
       */
      this.commitsSubject.next(commitDtos);

      // Return the list of CommitDto objects
      return commitDtos;
    } catch (error) {
      // Handle errors

      console.error(error);

      // If it's a standard error, log and handle it
      if (error instanceof Error) {
        this.handleError(error, 'Error fetching commits');
      } else {
        // If it's an unexpected error, throw an InternalServerErrorException
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

  /**
   * Method to subscribe to commit updates
   */
  getCommitsUpdates() {
    return this.commitsSubject.asObservable();
  }
}
