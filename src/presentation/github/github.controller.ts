import { Controller, Get } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
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

  notifyCommitsUpdate(commits: any[]) {
    if (this.server) {
      this.server.emit('commitsUpdate', commits);
    }
  }
}
