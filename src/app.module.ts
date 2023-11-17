import { Module } from '@nestjs/common';
import { GithubApiModule } from './github-api/github-api.module';
import { ConfigModule } from '@nestjs/config';
import { ApplicationModule } from './application/application.module';
import { PresentationModule } from './presentation/presentation.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [ConfigModule.forRoot(), GithubApiModule, ApplicationModule, InfrastructureModule, PresentationModule],
})
export class AppModule {}
