import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApplicationModule } from './application/GithubApplicationModule';
import { GithubPresentationModule } from './presentation/GithubPresentationModule';
import { InfrastructureApplicationModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [
    // Load environment variables using the ConfigModule
    ConfigModule.forRoot(),

    // Import the ApplicationModule where your application's core functionality is defined
    ApplicationModule,

    // Import the InfrastructureModule to handle low-level services like database connections
    InfrastructureApplicationModule,

    // Import the PresentationModule where your controllers and application's HTTP layer are defined
    GithubPresentationModule,
  ],
})
export class AppModule {}
