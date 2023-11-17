import { Module } from '@nestjs/common';
import { Github } from './github/github';

@Module({
  providers: [Github]
})
export class GithubModule {}
