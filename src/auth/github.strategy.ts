import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get('GITHUB_CLIENT_ID'),
      clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
      callbackURL: 'http://localhost:4000/auth/github/callback',
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    // Aquí puedes realizar lógica para validar o registrar al usuario en tu sistema
    // profile contiene la información del usuario obtenida de GitHub
    // Debes decidir cómo manejar esta información y si el usuario tiene acceso a tu aplicación
    return profile;
  }
}
