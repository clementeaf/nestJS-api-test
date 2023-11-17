import { Module } from '@nestjs/common';
import { GithubController } from './github/github.controller';

@Module({
  controllers: [GithubController],
})
export class PresentationModule {}
