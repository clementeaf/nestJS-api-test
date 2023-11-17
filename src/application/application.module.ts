import { Module } from '@nestjs/common';
import { GithubController } from './github/github.controller';
import { ApplicationGithubService } from './github/github.service';

/**
 * Module for managing application-level components, such as controllers and services,
 * related to GitHub functionality.
 */
@Module({
  controllers: [GithubController],
  providers: [ApplicationGithubService],
})
export class ApplicationModule {}
