import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';

import { TrackService } from './tracks.service';
import { TrackController } from './tracks.controller';

import { TrackEntity } from './track.entity';

import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrackEntity]),
    forwardRef(() => FavoritesModule),
  ],
  exports: [TrackService],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
