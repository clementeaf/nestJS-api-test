import { Test, TestingModule } from '@nestjs/testing';
import { GithubController } from './github.controller';
import { ApplicationGithubService } from '../../application/github/githubAppService/github.service';

describe('GithubController', () => {
  let controller: GithubController;

  beforeEach(async () => {
    // Set up the testing module with the necessary controller and service
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GithubController],
      providers: [ApplicationGithubService],
    }).compile();

    // Obtain an instance of the controller for testing
    controller = module.get<GithubController>(GithubController);
  });

  /**
   * Test if the GithubController is defined.
   * This test ensures that the controller instance is created successfully.
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
