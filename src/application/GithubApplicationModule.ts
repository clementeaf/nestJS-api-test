import { Module } from '@nestjs/common';
import { ApplicationGithubService } from './github/github/github.service';

/**
 * Module for managing application-level components, such as controllers and services,
 * related to GitHub functionality.
 */
@Module({
  providers: [ApplicationGithubService],
})
export class ApplicationModule {}
