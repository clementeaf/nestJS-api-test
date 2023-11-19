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
  @IsString({ message: 'Name should be a string' })
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string = '';

  @IsObject()
  @ValidateNested()
  owner!: {
    login: string;
    url: string;
  };

  @IsString({ message: 'HTML URL should be a string' })
  html_url!: string;

  @IsString({ message: 'Created at should be a string' })
  created_at!: string;

  @IsString({ message: 'Updated at should be a string' })
  updated_at!: string;

  @IsString({ message: 'Language should be a string' })
  language!: string;

  @IsString({ message: 'Visibility should be a string' })
  visibility!: string;

  @IsString({ message: 'Default branch should be a string' })
  default_branch!: string;
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
    message: string;
  } = {
    author: { name: '', email: '', date: '' },
    message: '',
  };
}
