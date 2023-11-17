/* eslint-disable @typescript-eslint/no-unused-vars */
// application/github/github.service.ts

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GitHubConnection } from '../../infrastructure/github/github/github';
import { CommitDto, RepoInfoDto } from './github.dto/github.dto';

@Injectable()
export class ApplicationGithubService {
  private readonly gitHubConnection: GitHubConnection;

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
      throw new InternalServerErrorException(
        'Error fetching repository information',
      );
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

      const commitsDto: CommitDto[] = (commits || []).map((commit) => {
        return {
          sha: commit.sha,
        };
      });

      return commitsDto;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error fetching commits');
    }
  }
}
