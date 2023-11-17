import { GithubRepository } from './github.repository';

describe('GithubRepository', () => {
  it('should be defined', () => {
    expect(new GithubRepository()).toBeDefined();
  });
});
