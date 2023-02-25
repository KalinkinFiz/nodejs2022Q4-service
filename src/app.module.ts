import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './modules/users/users.module';
import { AlbumModule } from './modules/albums/albums.module';
import { ArtistModule } from './modules/artists/artists.module';
import { TrackModule } from './modules/tracks/tracks.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { AuthModule } from './auth/auth.module';

import { AppDataSource } from './config.orm';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    UserModule,
    AlbumModule,
    ArtistModule,
    TrackModule,
    FavoritesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
