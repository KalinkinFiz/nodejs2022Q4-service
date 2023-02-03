import { Module } from '@nestjs/common';

import { AlbumService } from './albums.service';
import { AlbumController } from './albums.controller';
import { DbModule } from '../../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
