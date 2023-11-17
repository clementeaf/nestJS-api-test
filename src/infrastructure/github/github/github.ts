import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/core';

@Injectable()
export class GitHubConnection {
  private readonly octokit: Octokit;

  constructor() {
    this.octokit = new Octokit();
  }

  async getRepoInfo(owner: string, repo: string) {
    try {
      const { data } = await this.octokit.request('GET /repos/{owner}/{repo}', {
        owner,
        repo,
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async getCommits(owner: string, repo: string) {
    try {
      const { data } = await this.octokit.request(
        'GET /repos/{owner}/{repo}/commits',
        {
          owner,
          repo,
        },
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
