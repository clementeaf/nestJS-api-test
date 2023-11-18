export interface RepositoryInfo {
  name: string;
}

interface CommitDetails {
  author: {
    name: string;
    email: string;
    date: string;
  };
}

export interface Commit {
  commit: CommitDetails;
  sha: string;
}
