import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/users.module';
import { AlbumModule } from './modules/albums/albums.module';

@Module({
  imports: [UserModule, AlbumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
