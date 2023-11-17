import { Test, TestingModule } from '@nestjs/testing';
import { GitHubConnection } from './github';

describe('GitHubConnection', () => {
  let provider: GitHubConnection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GitHubConnection],
    }).compile();

    provider = module.get<GitHubConnection>(GitHubConnection);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
