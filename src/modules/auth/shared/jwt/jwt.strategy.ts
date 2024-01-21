import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { secretKey } from 'src/modules/auth/constants';
import { JwtPayloadDto } from 'src/modules/auth/dtos';
import { AuthService } from 'src/modules/auth/shared/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretKey,
    });
  }

  async validate(payload: JwtPayloadDto) {
    const userIsDisabled = await this.authService.userIsDisabled(payload.sub);
    if (userIsDisabled) throw new UnauthorizedException();

    return {
      id: payload.sub,
      active: payload.active,
      rule: payload.rule,
    };
  }
}
