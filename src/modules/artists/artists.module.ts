import { Module } from '@nestjs/common';

import { ArtistService } from './artists.service';
import { ArtistController } from './artists.controller';
import { DbModule } from '../../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
