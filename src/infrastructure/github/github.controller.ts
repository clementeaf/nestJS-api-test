import { Controller, Get, NotFoundException } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import {
  CommitDto,
  RepoInfoDto,
} from '../../application/github/dto/github.dto';
import { ApplicationGithubService } from '../../application/github/githubAppService/github.service';
import { ApiExcludeEndpoint, ApiResponse } from '@nestjs/swagger';
import { RepositoryNotFoundException } from '../../application/github/exceptions/RepositoryNotFoundException';

/**
 * Controller responsible for handling Github-related HTTP requests.
 * Endpoints:
 * - GET /github/repo-info: Retrieve information about the Github repository.
 * - GET /github/commits: Retrieve a list of commits from the Github repository.
 */
@WebSocketGateway()
@Controller('github')
export class GithubController
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server | undefined;

  constructor(private readonly githubService: ApplicationGithubService) {
    // Subscribe to commit updates
    this.githubService.getCommitsUpdates().subscribe((commits: CommitDto[]) => {
      // Notify connected clients about the commits update
      if (this.server) {
        this.server.emit('commitsUpdate', commits);
      }
    });
  }

  private clients: Socket[] = [];

  handleConnection(client: Socket) {
    this.clients.push(client);
  }

  handleDisconnect(client: Socket) {
    this.clients = this.clients.filter((c) => c.id !== client.id);
  }

  setServer(server: Server) {
    this.server = server;
  }

  /**
   * Endpoint: GET /github/repo-info
   * Retrieve information about the Github repository.
   * @returns {Promise<RepoInfoDto>} Information about the Github repository.
   */
  @ApiResponse({
    status: 200,
    description: 'Repository information retrieved successfully.',
    type: RepoInfoDto,
  })
  @ApiResponse({ status: 404, description: 'Repository not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get('repo-info')
  async getRepoInfo(): Promise<RepoInfoDto> {
    try {
      const repoInfo = await this.githubService.fetchRepositoryInfo();
      if (!repoInfo) {
        throw new RepositoryNotFoundException('Repository not found');
      }
      return repoInfo;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new RepositoryNotFoundException(error.message);
      } else {
        throw new RepositoryNotFoundException(
          'Unexpected error fetching repository information',
        );
      }
    }
  }

  /**
   * Endpoint: GET /github/commits
   * Retrieve a list of commits from the Github repository.
   * @returns {Promise<CommitDto[]>} List of commits from the Github repository.
   */
  @ApiResponse({
    status: 200,
    description: 'Commits retrieved successfully.',
    type: CommitDto,
    isArray: true,
  })
  @ApiResponse({ status: 404, description: 'Commits not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get('commits')
  async getCommits(): Promise<CommitDto[]> {
    try {
      const commits = await this.githubService.fetchCommitsFromGithub();
      if (!commits) {
        throw new RepositoryNotFoundException('Commits not found');
      }
      return commits;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw new RepositoryNotFoundException(error.message);
      } else {
        throw new RepositoryNotFoundException(
          'Unexpected error fetching commits',
        );
      }
    }
  }

  @ApiExcludeEndpoint()
  @SubscribeMessage('subscribeToCommits')
  handleSubscribeToCommits(client: Socket): void {
    const response = {
      event: 'subscribedToCommits',
      message: 'You are now subscribed to new commits.',
      timestamp: new Date().toISOString(),
    };

    client.emit(response.event, response);
  }

  notifyCommitsUpdate(commits: any[]) {
    if (this.server) {
      this.server.emit('commitsUpdate', commits);
    }
  }
}
