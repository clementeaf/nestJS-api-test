export interface RepoInfo {
  name: string;
}

export interface CommitAuthor {
  name: string;
  email: string;
  date: string;
}

export interface Commit {
  sha: string;
  commit: {
    author: CommitAuthor;
  };
}
