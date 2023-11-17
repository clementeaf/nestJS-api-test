/* eslint-disable @typescript-eslint/no-unused-vars */
// application/github/github.service.ts

import { Injectable } from '@nestjs/common';
import { GitHubConnection } from '../../infrastructure/github/github/github';
import { CommitDto, RepoInfoDto } from './github.dto/github.dto';

@Injectable()
export class ApplicationGithubService {
  private readonly gitHubConnection: GitHubConnection;

  constructor() {
    this.gitHubConnection = new GitHubConnection();
  }

  async getRepoInfo(): Promise<RepoInfoDto> {
    const owner = 'clementeaf';
    const repo = 'nestJS-api-test';

    const repoInfo = await this.gitHubConnection.getRepoInfo(owner, repo);

    const repoInfoDto: RepoInfoDto = {
      name: repoInfo?.name,
    };

    return repoInfoDto;
  }

  async getCommits(): Promise<CommitDto[]> {
    const owner = 'clementeaf';
    const repo = 'nestJS-api-test';
    const commits = await this.gitHubConnection.getCommits(owner, repo);

    const commitsDto: CommitDto[] = (commits || []).map((commit) => {
      return {
        sha: commit.sha,
      };
    });

    return commitsDto;
  }
}
