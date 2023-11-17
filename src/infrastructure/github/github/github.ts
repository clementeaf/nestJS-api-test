import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/core';

/**
 * Service responsible for connecting to the GitHub API and fetching repository data.
 */
@Injectable()
export class GitHubConnection {
  private readonly octokit: Octokit;

  constructor() {
    this.octokit = new Octokit();
  }

  /**
   * Fetch repository information from the GitHub API.
   * @param {string} owner - Owner of the repository.
   * @param {string} repo - Name of the repository.
   * @returns {Promise<any>} Information about the GitHub repository.
   */
  async getRepoInfo(owner: string, repo: string): Promise<any> {
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

  /**
   * Fetch a list of commits from the GitHub API.
   * @param {string} owner - Owner of the repository.
   * @param {string} repo - Name of the repository.
   * @returns {Promise<any>} List of commits from the GitHub repository.
   */
  async getCommits(owner: string, repo: string): Promise<any> {
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
