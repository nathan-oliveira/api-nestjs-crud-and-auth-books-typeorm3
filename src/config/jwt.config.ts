import { ConfigService } from '@nestjs/config';

export default async (configService: ConfigService) => ({
  secret: configService.get<string>('JWT_SECRET'),
  signOptions: { expiresIn: '12h' },
});
