import { Module } from '@nestjs/common';
import { GithubController } from '../infrastructure/github/github.controller';
import { ApplicationGithubService } from '../application/github/githubAppService/github.service';

/**
 * Presentation module for organizing controllers related to Github presentation.
 * This module encapsulates the GithubController for handling presentation logic.
 */
@Module({
  controllers: [GithubController],
  providers: [ApplicationGithubService],
})
export class GithubPresentationModule {}
