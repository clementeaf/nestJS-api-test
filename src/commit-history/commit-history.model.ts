import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CommitHistory extends Document {
  @Prop()
  sha: string;

  @Prop()
  authorName: string;

  @Prop()
  authorLogin: string;

  @Prop()
  message: string;

  @Prop()
  url: string;

  @Prop()
  date: Date;
}

export const CommitHistorySchema = SchemaFactory.createForClass(CommitHistory);

export type CommitHistoryDocument = CommitHistory & Document;
