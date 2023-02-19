import { forwardRef, Module } from '@nestjs/common';

import { AlbumService } from './albums.service';
import { AlbumController } from './albums.controller';
import { DbModule } from '../../db/db.module';

import { FavoritesModule } from '../favorites/favorites.module';
import { TrackModule } from '../tracks/tracks.module';

@Module({
  imports: [
    DbModule,
    forwardRef(() => FavoritesModule),
    forwardRef(() => TrackModule),
  ],
  exports: [AlbumService],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
