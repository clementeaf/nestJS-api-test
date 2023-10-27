import { Injectable } from '@nestjs/common';

@Injectable()
export class DataBaseService {
  // Simulación de una base de datos de usuarios
  static users: {
    find(arg0: (user: any) => boolean): unknown;
    length: number;
    push(newUser: {
      id: any; // Esto es solo un ejemplo
      githubId: any;
    }): unknown;
    githubId: string;
  };

  static async findUserByGitHubId(githubId: string) {
    return this.users.find((user) => user.githubId === githubId);
  }

  static async createUserFromGitHubData(githubUser: { id: any }) {
    // Accede a los métodos y propiedades estáticas a través de "this"
    // Aquí, deberías crear un nuevo usuario en tu base de datos y almacenar la información relevante
    // Luego, devuelve el usuario recién creado
    const newUser = {
      id: this.users.length + 1, // Esto es solo un ejemplo
      githubId: githubUser.id, // El identificador único de GitHub
      // Otros datos que deseas almacenar
    };
    this.users.push(newUser);
    return newUser;
  }
}
