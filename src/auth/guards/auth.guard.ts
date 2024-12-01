import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const token = request.headers['token'];

    if (!token) {
      throw new UnauthorizedException('Está faltando passar o token!');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      request.user = decoded;
      console.log(decoded);
    } catch (error) {
      throw new UnauthorizedException('Token inválido!');
    }

    return true;
  }
}
