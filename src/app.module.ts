import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommitHistoryModule } from './commit-history/commit-history.module';
import { GithubApiModule } from './github-api/github-api.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://clemente:clemente@blazorappdb.j8v7ctn.mongodb.net/blazorappdb',
    ),
    CommitHistoryModule,
    GithubApiModule,
  ],
})
export class AppModule {}
