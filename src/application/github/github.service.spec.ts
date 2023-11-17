import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationGithubService } from './github.service';

describe('ApplicationGithubService', () => {
  let service: ApplicationGithubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationGithubService],
    }).compile();

    service = module.get<ApplicationGithubService>(ApplicationGithubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
