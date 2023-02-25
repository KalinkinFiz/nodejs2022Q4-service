import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

// application
const PORT: number = +process.env.PORT || 4000;

// JWT
const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || 'secret123123';
const JWT_SECRET_REFRESH_KEY: string =
  process.env.JWT_SECRET_REFRESH_KEY || 'secret123123';

// database
const POSTGRES_HOST: string = process.env.POSTGRES_HOST || 'postgres';
const POSTGRES_PORT = process.env.POSTGRES_PORT || 5432;
const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'postgres';
const POSTGRES_DB = process.env.POSTGRES_DB || 'postgres';

export {
  PORT,
  JWT_SECRET_KEY,
  JWT_SECRET_REFRESH_KEY,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
};
