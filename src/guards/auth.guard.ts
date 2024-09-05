import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as fs from 'fs';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

		if (!token) {
      throw new UnauthorizedException('Invalid Token');
    }
    try {
      const payload = this.jwtService.verify(
        token, 
				{ 
					publicKey: fs.readFileSync('./certificates/public.key'),
          algorithms: ['RS256'],
				}
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['userId'] = payload.userId;
			request['roles'] = payload.roles
    } catch(e) {
			Logger.error(e.message)
      throw new UnauthorizedException('Invalid Token');
    }

    return true; // or false if the user is not authenticated
  }

	private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
