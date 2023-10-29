import { Module } from '@nestjs/common';
import { GithubApiModule } from './github-api/github-api.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), GithubApiModule],
})
export class AppModule {}
