import { Module } from '@nestjs/common';

import { TrackService } from './tracks.service';
import { TrackController } from './tracks.controller';
import { DbModule } from '../../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
