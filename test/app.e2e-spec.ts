import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest'; 
import { AppModule } from '../src/app.module';
import { CommitDto } from '../src/application/github/dto/github.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/github/repo-info (GET)', () => {
    return request(app.getHttpServer())
      .get('/github/repo-info')
      .expect(200)
      .expect({
        name: 'nestJS-api-test'
      });
  });

  it('/github/commits (GET)', () => {
    return request(app.getHttpServer())
      .get('/github/commits')
      .expect(200)
      .expect((response) => {
        const commits = response.body as CommitDto[];
        expect(commits.length).toBeGreaterThan(0);
  
        const expectedCommit = {
          sha: '61caa95983d12a0f6ba414796096cb4ba1bcb80f',
          commit: {
            author: {
              name: 'clemente',
              email: 'carriagadafalcone@gmail.com',
              date: '2023-11-18T17:28:22Z',
            },
          },
        };
  
        const matchingCommit = commits.find(commit => commit.sha === expectedCommit.sha);
        expect(matchingCommit).toBeDefined();
        expect(matchingCommit).toMatchObject(expectedCommit);
      });
  });
});
