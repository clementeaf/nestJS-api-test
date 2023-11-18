import { Module } from '@nestjs/common';
import { GitHubConnection } from './github/github';
/**
 * Module for handling GitHub-related functionalities and connections.
 */
@Module({
  providers: [GitHubConnection],
})
export class GithubApplicationModule {}
