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

export { PORT, JWT_SECRET_KEY, JWT_SECRET_REFRESH_KEY };
