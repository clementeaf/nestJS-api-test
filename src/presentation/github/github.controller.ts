import { Controller, Get } from '@nestjs/common';
import { SubscribeMessage } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ApplicationGithubService } from '../../application/github/github.service';
import {
  CommitDto,
  RepoInfoDto,
} from '../../application/github/github.dto/github.dto';

/**
 * Controller responsible for handling Github-related HTTP requests.
 * Endpoints:
 * - GET /github/repo-info: Retrieve information about the Github repository.
 * - GET /github/commits: Retrieve a list of commits from the Github repository.
 */
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: ApplicationGithubService) {}

  /**
   * Endpoint: GET /github/repo-info
   * Retrieve information about the Github repository.
   * @returns {Promise<RepoInfoDto>} Information about the Github repository.
   */
  @Get('repo-info')
  async getRepoInfo(): Promise<RepoInfoDto> {
    return this.githubService.getRepoInfo();
  }

  /**
   * Endpoint: GET /github/commits
   * Retrieve a list of commits from the Github repository.
   * @returns {Promise<CommitDto[]>} List of commits from the Github repository.
   */
  @Get('commits')
  async getCommits(): Promise<CommitDto[]> {
    return this.githubService.getCommits();
  }

  @SubscribeMessage('subscribeToCommits')
  handleSubscribeToCommits(client: Socket): void {
    const response = {
      event: 'subscribedToCommits',
      message: 'You are now subscribed to new commits.',
      timestamp: new Date().toISOString(),
    };

    client.emit(response.event, response);
  }
}
