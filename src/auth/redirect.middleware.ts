import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RedirectMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (!req.isAuthenticated()) {
      return res.redirect('http://localhost:3000/auth/github');
    }
    next();
  }
}
