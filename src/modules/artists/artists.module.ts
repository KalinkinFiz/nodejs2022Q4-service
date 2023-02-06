import { forwardRef, Module } from '@nestjs/common';

import { ArtistService } from './artists.service';
import { ArtistController } from './artists.controller';
import { DbModule } from '../../db/db.module';

import { FavoritesModule } from '../favorites/favorites.module';
import { TrackModule } from '../tracks/tracks.module';
import { AlbumModule } from '../albums/albums.module';

@Module({
  imports: [
    DbModule,
    forwardRef(() => FavoritesModule),
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
  ],
  exports: [ArtistService],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
