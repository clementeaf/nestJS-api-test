import { IsNotEmpty, IsString } from 'class-validator';
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
export class CommitAuthorDto implements CommitAuthor {
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
export class CommitDto implements Commit {
  sha: string = '';
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
  } = { author: { name: '', email: '', date: '' } };
}
