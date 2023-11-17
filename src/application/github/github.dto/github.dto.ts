import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Data transfer object for repository information.
 */
export class RepoInfoDto {
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
export class CommitDto {
  /**
   * The SHA (Secure Hash Algorithm) of the commit.
   */
  @IsString({ message: 'SHA should be a string' })
  @IsNotEmpty({ message: 'SHA should not be empty' })
  sha: string = '';
}

/**
 * Data transfer object for creating a new commit.
 */
export class CreateCommitDto {
  /**
   * The commit message.
   */
  @IsString({ message: 'Message should be a string' })
  @IsNotEmpty({ message: 'Message should not be empty' })
  message: string = '';

  /**
   * The author of the commit.
   */
  @IsString({ message: 'Author should be a string' })
  @IsNotEmpty({ message: 'Author should not be empty' })
  author: string = '';
}
