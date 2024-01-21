import { Injectable } from '@nestjs/common';
import { version } from 'src/../package.json';
import { ReadVersionDto } from '../dtos';

@Injectable()
export class VersionService {
  static readonly startupDate = new Date();

  getVersion(): ReadVersionDto {
    return {
      currentVersion: version,
      startupDate: VersionService.startupDate,
    };
  }
}
