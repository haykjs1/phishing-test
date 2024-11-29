import { registerAs } from '@nestjs/config';

export interface IAppConfig {
  databaseName: string;
  userSecret: string;
  userExpiresIn: string;
  port: number;
  databaseUrl: string;
  email: string;
  password: string;
}

export default registerAs(
  'app',
  (): IAppConfig => ({
    databaseName: process.env.DATABASE_NAME,
    databaseUrl: process.env.DATABASE_URL,
    userSecret: process.env.JWT_USER_SECRET,
    userExpiresIn: process.env.JWT_USER_TOKEN_EXPIRES_IN,
    port: parseInt(process.env.PORT, 10) || 3000,
    email: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASS,
  }),
);
export interface IJwtPayload {
  id: number;
  email: string;
}
export enum SALT_ROUNDS {
  SALT_ROUNDS_VALUE = 10,
}
