import { Injectable } from '@nestjs/common';

@Injectable()
export class DataBaseService {
  // User database simulation
  static users: {
    find(arg0: (user: any) => boolean): unknown;
    length: number;
    push(newUser: { id: any; githubId: any }): unknown;
    githubId: string;
  };

  static async findUserByGitHubId(githubId: string) {
    return this.users.find((user) => user.githubId === githubId);
  }

  static async createUserFromGitHubData(githubUser: { id: any }) {
    const newUser = {
      id: this.users.length + 1,
      githubId: githubUser.id,
    };
    this.users.push(newUser);
    return newUser;
  }
}
