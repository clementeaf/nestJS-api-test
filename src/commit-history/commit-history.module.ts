import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommitHistoryController } from './commit-history.controller';
import { CommitHistoryService } from './commit-history.service';
import { CommitHistory, CommitHistorySchema } from './commit-history.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommitHistory.name, schema: CommitHistorySchema },
    ]),
  ],
  controllers: [CommitHistoryController],
  providers: [CommitHistoryService],
})
export class CommitHistoryModule {}
