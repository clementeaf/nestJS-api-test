import { Module } from '@nestjs/common';
import { GithubController } from './github/github.controller';
import { GithubService } from './github/github.service';

@Module({
  controllers: [GithubController],
  providers: [GithubService]
})
export class ApplicationModule {}
