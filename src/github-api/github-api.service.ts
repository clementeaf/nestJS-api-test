import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/core';
import { Server } from 'ws';

@Injectable()
export class GithubApiService {
  private readonly octokit: Octokit;
  private wss: Server;

  constructor() {
    const accessToken = '24115446489b35a8d88a2f5e013edf79f54c7a4d';
    this.octokit = new Octokit({
      auth: accessToken,
    });
    this.wss = new Server({ noServer: true });

    this.wss.on('connection', (ws) => {
      console.log('WebSocket connection open');

      ws.on('message', (message) => {
        console.log(`Received: ${message}`);
      });

      ws.on('error', (error) => {
        console.error(error);
      });

      ws.on('close', () => {
        console.log('WebSocket connection closed');
      });
    });
  }

  async getRepoInfo() {
    try {
      const owner = 'clementeaf';
      const repo = 'nestJS-api-test';
      const { data } = await this.octokit.request('GET /repos/{owner}/{repo}', {
        owner,
        repo,
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async getCommits() {
    try {
      const owner = 'clementeaf';
      const repo = 'nestJS-api-test';
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
