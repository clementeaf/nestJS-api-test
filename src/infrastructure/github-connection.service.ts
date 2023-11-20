import fetch from 'node-fetch';
import { Injectable, Logger } from '@nestjs/common';
import { Octokit } from '@octokit/core';
import { Commit, RepoInfo } from '../application/github/dto/interfaces.dto';
import { RepositoryNotFoundException } from '../application/github/exceptions/RepositoryNotFoundException';

/**
 * Service responsible for connecting to the GitHub API and fetching repository data.
 */
@Injectable()
export class GitHubConnection {
  private readonly octokit: Octokit;
  private readonly logger = new Logger(GitHubConnection.name);

  constructor() {
    this.octokit = new Octokit({
      auth: process.env.GITHUB_ACCESS_TOKEN,
      request: {
        fetch,
      },
    });
  }

  /**
   * Fetch repository information from the GitHub API.
   * @param {string} owner - Owner of the repository.
   * @param {string} repo - Name of the repository.
   * @returns {Promise<RepositoryInfo>} Information about the GitHub repository.
   */
  async getRepoInfo(owner: string, repo: string): Promise<RepoInfo> {
    try {
      const { data } = await this.octokit.request('GET /repos/{owner}/{repo}', {
        owner,
        repo,
      });
      this.logger.log(`Retrieved repository information for ${owner}/${repo}`);
      return data as RepoInfo;
    } catch (error) {
      if (error instanceof Error && 'status' in error) {
        if (error.status === 404) {
          throw new RepositoryNotFoundException('Repository not found');
        }
      }
      this.logger.error(
        `Error fetching repository information for ${owner}/${repo}`,
        error,
        GitHubConnection.name,
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
      if (error instanceof Error && 'status' in error) {
        if (error.status === 404) {
          throw new RepositoryNotFoundException('Repository not found');
        }
      }
      this.logger.error(
        `Error fetching repository information for ${owner}/${repo}`,
        error,
        GitHubConnection.name,
      );
      console.error(error);
      throw error;
    }
  }
}
