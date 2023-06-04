import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { UserService } from '../../../modules/users/services/user.service';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UserService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback): Promise<void> {
    const cacheUser: any = JSON.parse(
      (await this.cacheService.get(`user-${payload.id}`)) || '{}',
    );
    let user = cacheUser;
    if (!user.id) {
      user = await this.usersService.findOne(payload.id, {
        relations: {
          role: true,
        },
        select: {
          id: true,
          active: true,
          role: {
            id: true,
            name: true,
          },
        },
      });
    }
    if (!user) {
      return done(
        new HttpException('UNAUTHORIZED TOKEN', HttpStatus.UNAUTHORIZED),
        false,
      );
    }
    if (!user.active) {
      return done(
        new HttpException('FORBIDDEN ACTION', HttpStatus.FORBIDDEN),
        false,
      );
    }
    if (!cacheUser.id) {
      await this.cacheService.set(
        `user-${payload.id}`,
        JSON.stringify(user),
        5000,
      );
    }
    return done(null, user, payload.iat);
  }
}
