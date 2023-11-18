import { Module } from '@nestjs/common';
import { GithubApplicationModule } from './github/GithubInfrastructureModule';

@Module({
  imports: [GithubApplicationModule],
})
export class InfrastructureApplicationModule {}
