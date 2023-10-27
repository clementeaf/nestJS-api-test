import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommitHistoryModule } from './commit-history/commit-history.module';
import { WebsocketModule } from './websocket/websocket.module';
import { GithubApiModule } from './github-api/github-api.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://clemente:clemente@blazorappdb.j8v7ctn.mongodb.net/blazorappdb',
    ),
    CommitHistoryModule,
    WebsocketModule,
    GithubApiModule,
    AuthModule,
  ],
  controllers: [AuthController],
})
export class AppModule {}
