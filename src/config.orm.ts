import { DataSourceOptions } from 'typeorm';
import {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} from './environments';

export const ormConfig = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [],
  subscribers: [],
  migrationsRun: true,
  migrationsTableName: 'migrations',
  migrations: [],
} as DataSourceOptions;
