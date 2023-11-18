import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { RepoInfo, CommitAuthor, Commit } from './interfaces.dto';

/**
 * Data transfer object for repository information.
 */
export class RepoInfoDto implements RepoInfo {
  /**
   * The name of the repository.
   */
  @IsString({ message: 'Name should be a string' })
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string = '';
}

/**
 * Data transfer object for commit information.
 */
class CommitAuthorDto implements CommitAuthor {
  @IsString({ message: 'Author name should be a string' })
  @IsNotEmpty({ message: 'Author name should not be empty' })
  name: string = '';

  @IsString({ message: 'Author email should be a string' })
  @IsNotEmpty({ message: 'Author email should not be empty' })
  email: string = '';

  @IsString({ message: 'Author date should be a string' })
  @IsNotEmpty({ message: 'Author date should not be empty' })
  date: string = '';
}

class CommitDto implements Commit {
  @IsString({ message: 'SHA should be a string' })
  @IsNotEmpty({ message: 'SHA should not be empty' })
  sha: string = '';

  @IsObject({ message: 'Commit information should be an object' })
  @ValidateNested({ each: true })
  @Type(() => CommitAuthorDto)
  author: CommitAuthorDto = {
    name: '',
    email: '',
    date: '',
  };
}

export { CommitDto, CommitAuthorDto };
