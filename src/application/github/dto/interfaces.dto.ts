export interface RepoInfo {
  name: string;
  owner: {
    login: string;
    url: string;
  };
  html_url: string;
  created_at: string;
  updated_at: string;
  language: string;
  visibility: string;
  default_branch: string;
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
    message: string;
  };
}
