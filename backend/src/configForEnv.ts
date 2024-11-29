import * as dotenv from 'dotenv';

dotenv.config();
interface IConfigForEnv {
  databaseName: string;
  userSecret: string;
  userExpiresIn: string;
  port: number;
  databaseUrl: string;
  email: string;
  password: string;
}

export const configForEnv: IConfigForEnv = {
  databaseName: process.env.DATABASE_NAME,
  databaseUrl: process.env.DATABASE_URL,
  userSecret: process.env.JWT_USER_SECRET,
  userExpiresIn: process.env.JWT_USER_TOKEN_EXPIRES_IN,
  port: parseInt(process.env.PORT, 10) || 3000,
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
};
