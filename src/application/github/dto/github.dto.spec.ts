import { RepoInfoDto, CommitDto } from './github.dto';

describe('RepoInfoDto', () => {
  it('should be defined', () => {
    expect(new RepoInfoDto()).toBeDefined();
  });
});

describe('CommitDto', () => {
  it('should be defined', () => {
    expect(new CommitDto()).toBeDefined();
  });
});
