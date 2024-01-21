export interface JwtPayloadDto {
  iat: number;
  sub: string;
  active: boolean;
  rule: number;
}
