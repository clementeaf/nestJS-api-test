// github-connection-module.ts
import { Module } from '@nestjs/common';
import { GitHubConnection } from './github-connection.service';

@Module({
  providers: [GitHubConnection],
  exports: [GitHubConnection],
})
export class GitHubConnectionModule {}
