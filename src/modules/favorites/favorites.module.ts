import { forwardRef, Module } from '@nestjs/common';

import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { DbModule } from '../../db/db.module';

import { AlbumModule } from '../albums/albums.module';
import { ArtistModule } from '../artists/artists.module';
import { TrackModule } from '../tracks/tracks.module';

@Module({
  imports: [
    DbModule,
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
  ],
  exports: [FavoritesService],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
