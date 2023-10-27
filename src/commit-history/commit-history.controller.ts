import { Controller, Get } from '@nestjs/common';
import { CommitHistoryService } from './commit-history.service';
import { CommitHistory } from './commit-history.model';

@Controller('commit-history')
export class CommitHistoryController {
  constructor(private readonly commitHistoryService: CommitHistoryService) {}

  @Get()
  async getCommits(): Promise<CommitHistory[]> {
    const commits = await this.commitHistoryService.getCommits();
    return commits;
  }
}
