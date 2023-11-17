import { Controller, Get } from '@nestjs/common';
import { ApplicationGithubService } from '../../application/github/github.service';
import {
  CommitDto,
  RepoInfoDto,
} from '../../application/github/github.dto/github.dto';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: ApplicationGithubService) {}

  @Get('repo-info')
  async getRepoInfo(): Promise<RepoInfoDto> {
    return this.githubService.getRepoInfo();
  }

  @Get('commits')
  async getCommits(): Promise<CommitDto[]> {
    return this.githubService.getCommits();
  }
}
