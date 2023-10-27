import { Controller, Get } from '@nestjs/common';
import { GithubApiService } from './github-api.service';

@Controller('github-api')
export class GithubApiController {
  constructor(private readonly githubApiService: GithubApiService) {}

  @Get('repo-info')
  async getRepoInfo() {
    return this.githubApiService.getRepoInfo();
  }

  @Get('commits')
  async getCommits() {
    return this.githubApiService.getCommits();
  }
}
