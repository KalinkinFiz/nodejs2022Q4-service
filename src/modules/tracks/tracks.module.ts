import { forwardRef, Module } from '@nestjs/common';

import { TrackService } from './tracks.service';
import { TrackController } from './tracks.controller';
import { DbModule } from '../../db/db.module';

import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [DbModule, forwardRef(() => FavoritesModule)],
  exports: [TrackService],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
