import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DataBaseService } from './DataBaseService';
import { generateAccessToken } from './generateAccessToken';
import axios from 'axios';

@Controller('auth')
export class AuthController {
  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubLogin() {
    // Route for github authentication
  }

  @Get('main')
  @UseGuards(AuthGuard('github'))
  main(@Req() request: any, @Res() response: any) {
    if (request.isAuthenticated()) {
      return 'Welcome to localhost:4000';
    } else {
      response.status(401).send('Unauthorized');
    }
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubLoginCallback(@Req() request: any, @Res() response: any) {
    const code = request.query.code;
    try {
      const { data } = await axios.post(
        'https://github.com/login/oauth/access_token',
        null,
        {
          params: {
            client_id: 'TuClientID',
            client_secret: 'TuClientSecret',
            code,
          },
        },
      );

      const accessToken = data.access_token;

      const { data: userData } = await axios.get(
        'https://api.github.com/user',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const existingUser = await DataBaseService.findUserByGitHubId(
        userData.id,
      );

      if (existingUser) {
        const token = generateAccessToken(existingUser);
        response.redirect('URL de inicio de sesión exitoso', token);
      } else {
        response.redirect('http://localhost:3000/auth/github');
      }
    } catch (error) {
      console.error('Error al intercambiar código por token de acceso:', error);
      response.redirect('URL de error', error);
    }
  }
}
