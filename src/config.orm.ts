import { DataSource } from 'typeorm';

import {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} from './environments';

import { UserEntity } from './modules/users/user.entity';
import { AlbumEntity } from './modules/albums/album.entity';
import { ArtistEntity } from './modules/artists/artist.entity';
import { TrackEntity } from './modules/tracks/track.entity';
import { FavoritesEntity } from './modules/favorites/favorites.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [
    UserEntity,
    AlbumEntity,
    ArtistEntity,
    TrackEntity,
    FavoritesEntity,
  ],
  subscribers: [],
  migrationsRun: true,
  migrationsTableName: 'migrations',
  migrations: ['dist/db/migrations/*{.ts,.js}'],
});
