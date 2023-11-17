import { Module } from '@nestjs/common';
import { GithubApiModule } from './github-api/github-api.module';
import { ConfigModule } from '@nestjs/config';
import { PresentationModule } from './presentation/presentation.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [
    // Load environment variables using the ConfigModule
    ConfigModule.forRoot(),

    // Import the GithubApiModule to enable GitHub API-related features
    GithubApiModule,

    // Import the ApplicationModule where your application's core functionality is defined
    ApplicationModule,

    // Import the InfrastructureModule to handle low-level services like database connections
    InfrastructureModule,

    // Import the PresentationModule where your controllers and application's HTTP layer are defined
    PresentationModule,
  ],
})
export class AppModule {}
