import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { VersionService } from './version.service';
import { ReadVersionDto } from '../dtos';

@Controller()
export class VersionController {
  constructor(private readonly versionService: VersionService) {}

  @Get()
  @ApiOkResponse({ type: ReadVersionDto })
  getVersion(): ReadVersionDto {
    const result = this.versionService.getVersion();
    return plainToClass(ReadVersionDto, result);
  }
}
