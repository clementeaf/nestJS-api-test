import { Injectable, Logger } from '@nestjs/common';
import { Octokit } from '@octokit/core';

interface RepositoryInfo {
  name: string;
}

interface Commit {
  sha: string;
}

/**
 * Service responsible for connecting to the GitHub API and fetching repository data.
 */
@Injectable()
export class GitHubConnection {
  private readonly octokit: Octokit;
  private readonly logger = new Logger(GitHubConnection.name);

  constructor() {
    this.octokit = new Octokit();
  }

  /**
   * Fetch repository information from the GitHub API.
   * @param {string} owner - Owner of the repository.
   * @param {string} repo - Name of the repository.
   * @returns {Promise<RepositoryInfo>} Information about the GitHub repository.
   */
  async getRepoInfo(owner: string, repo: string): Promise<RepositoryInfo> {
    try {
      const { data } = await this.octokit.request('GET /repos/{owner}/{repo}', {
        owner,
        repo,
      });
      this.logger.log(`Retrieved repository information for ${owner}/${repo}`);
      return data as RepositoryInfo;
    } catch (error) {
      this.logger.error(
        `Error fetching repository information for ${owner}/${repo}`,
        error,
      );
      console.error(error);
      throw error;
    }
  }

  /**
   * Fetch a list of commits from the GitHub API.
   * @param {string} owner - Owner of the repository.
   * @param {string} repo - Name of the repository.
   * @returns {Promise<Commit[]>} List of commits from the GitHub repository.
   */
  async getCommits(owner: string, repo: string): Promise<Commit[]> {
    try {
      const { data } = await this.octokit.request(
        'GET /repos/{owner}/{repo}/commits',
        {
          owner,
          repo,
        },
      );
      this.logger.log(`Retrieved commits for ${owner}/${repo}`);
      return data as Commit[];
    } catch (error) {
      this.logger.error(`Error fetching commits for ${owner}/${repo}`, error);
      console.error(error);
      throw error;
    }
  }
}
