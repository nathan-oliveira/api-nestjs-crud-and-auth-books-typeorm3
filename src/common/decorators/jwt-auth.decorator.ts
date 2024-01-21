import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { Rule } from 'src/modules/auth/enums/rule.enum';
import { JwtAuthGuard } from 'src/modules/auth/shared/jwt/jwt-auth.guard';
import { RulesGuard } from 'src/modules/auth/shared/rules/rules.guard';
import { Rules } from 'src/modules/auth/shared/rules/rules.decorator';

export const JwtAuth = (...rules: Rule[]) => {
  return applyDecorators(
    ApiBearerAuth('Authorization'),
    UseGuards(JwtAuthGuard, RulesGuard),
    Rules(...rules),
  );
};
