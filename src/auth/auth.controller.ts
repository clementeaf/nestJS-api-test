import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DataBaseService } from './DataBaseService';
import { generateAccessToken } from './generateAccessToken';

@Controller('auth')
export class AuthController {
  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubLogin() {
    // Esta ruta iniciará el proceso de autenticación de GitHub
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubLoginCallback(@Req() request: any, @Res() response: any) {
    const githubUser = request.user;
    const existingUser = await DataBaseService.findUserByGitHubId(
      githubUser.id,
    );

    if (existingUser) {
      const token = generateAccessToken(existingUser);
      response.redirect('URL de inicio de sesión exitoso', token);
    } else {
      const newUser =
        await DataBaseService.createUserFromGitHubData(githubUser);
      const token = generateAccessToken(newUser);
      response.redirect('URL de registro exitoso', token);
    }
  }
}
