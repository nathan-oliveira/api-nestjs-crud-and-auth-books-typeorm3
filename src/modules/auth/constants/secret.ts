// import { ConfigService } from '@nestjs/config';

// const configService = new ConfigService();
// export const secretKey = configService.get<string>('JWT_SECRET');

export const secretKey = process.env.JWT_SECRET || 'uT30nmJe0s29CT9EirRhqHChuJ';
