import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RedisService } from 'src/config/redis.config';

import { JwtPayloadDto } from 'src/modules/auth/dtos';
import { AuthService } from 'src/modules/auth/shared/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly redis: RedisService,
  ) {
    const configService = new ConfigService();
    const secretOrKey = configService.get<string>('JWT_SECRET');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey,
    });
  }

  async validate(payload: JwtPayloadDto) {
    const cachedPayload = await this.redis.get(payload.sub);
    const userIsDisabled = cachedPayload
      ? await this.authService.userIsDisabled(payload.sub)
      : true;

    if (!cachedPayload || userIsDisabled) throw new UnauthorizedException();

    return {
      id: payload.sub,
      active: payload.active,
      rule: payload.rule,
    };
  }
}
