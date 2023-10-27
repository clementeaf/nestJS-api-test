import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommitHistory, CommitHistoryDocument } from './commit-history.model';

@Injectable()
export class CommitHistoryService {
  constructor(
    @InjectModel(CommitHistory.name)
    private commitHistoryModel: Model<CommitHistoryDocument>,
  ) {}

  async createCommit(
    newCommitData: Partial<CommitHistory>,
  ): Promise<CommitHistory> {
    const createdCommit = new this.commitHistoryModel(newCommitData);
    return createdCommit.save();
  }

  async getCommits(): Promise<CommitHistory[]> {
    return this.commitHistoryModel.find().exec();
  }

  async createCommits(
    commitsData: Partial<CommitHistory>[],
  ): Promise<CommitHistory[]> {
    const createdCommits = await this.commitHistoryModel.create(commitsData);
    return createdCommits;
  }
}
