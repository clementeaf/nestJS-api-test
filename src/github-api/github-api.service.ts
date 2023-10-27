import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/core';
import { Server } from 'ws';

@Injectable()
export class GithubApiService {
  private readonly octokit: Octokit;
  private wss: Server;

  constructor() {
    this.octokit = new Octokit();
    this.wss = new Server({ noServer: true });

    this.wss.on('connection', (ws) => {
      console.log('WebSocket connection open');

      ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        // Puedes procesar y reaccionar a los mensajes aquí si es necesario.
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
