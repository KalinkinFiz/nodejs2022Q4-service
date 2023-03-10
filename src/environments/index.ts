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
const CRYPT_SALT = +process.env.CRYPT_SALT || 10;
const TOKEN_EXPIRE_TIME: string = process.env.TOKEN_EXPIRE_TIME || '1h';
const TOKEN_REFRESH_EXPIRE_TIME: string =
  process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h';

// logs
const LOG_LEVEL = +process.env.LOG_LEVEL;
const LOG_FILE_SIZE_KB = +process.env.LOG_FILE_SIZE_KB;

// database
const POSTGRES_HOST: string = process.env.POSTGRES_HOST || 'postgres';
const POSTGRES_PORT = process.env.POSTGRES_PORT || 5432;
const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'postgres';
const POSTGRES_DB = process.env.POSTGRES_DB || 'postgres';

export {
  PORT,
  CRYPT_SALT,
  JWT_SECRET_KEY,
  JWT_SECRET_REFRESH_KEY,
  TOKEN_EXPIRE_TIME,
  TOKEN_REFRESH_EXPIRE_TIME,
  LOG_LEVEL,
  LOG_FILE_SIZE_KB,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
};
