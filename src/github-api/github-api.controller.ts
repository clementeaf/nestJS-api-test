import { Controller, Get } from '@nestjs/common';
import { GithubApiService } from './github-api.service';

@Controller('github-api')
export class GithubApiController {
  constructor(private readonly githubApiService: GithubApiService) {}

  @Get('repo-info')
  async getRepoInfo() {
    const repoInfo = await this.githubApiService.getRepoInfo();
    return repoInfo;
  }

  @Get('commits')
  async getCommits() {
    const commits = await this.githubApiService.getCommits();
    return commits;
  }
}
