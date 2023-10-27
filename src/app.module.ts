import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommitHistoryModule } from './commit-history/commit-history.module';
import { WebsocketModule } from './websocket/websocket.module';
import { GithubApiModule } from './github-api/github-api.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { RedirectMiddleware } from './auth/redirect.middleware';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RedirectMiddleware)
      .forRoutes(
        { path: 'main', method: RequestMethod.ALL },
        { path: '/', method: RequestMethod.ALL },
        { path: '/repositoryInfo', method: RequestMethod.ALL },
        { path: '/commits', method: RequestMethod.ALL },
      );
  }
}
