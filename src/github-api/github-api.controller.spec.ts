import { Test, TestingModule } from '@nestjs/testing';
import { GithubApiController } from './github-api.controller';
import { GithubApiService } from './github-api.service';

describe('GitHubApiController', () => {
  let controller: GithubApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GithubApiController],
      providers: [GithubApiService],
    }).compile();

    controller = module.get<GithubApiController>(GithubApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
