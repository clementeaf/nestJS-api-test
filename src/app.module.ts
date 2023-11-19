import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApplicationModule } from './application/GithubApplicationModule';
import { GithubPresentationModule } from './presentation/GithubPresentationModule';
import { GitHubConnectionModule } from './infrastructure/github-connection-module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ApplicationModule,
    GitHubConnectionModule,
    GithubPresentationModule,
  ],
})
export class AppModule {}
