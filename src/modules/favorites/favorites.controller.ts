import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';

import { FavoritesService } from './favorites.service';

@Controller('favs/')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    const favorites = await this.favoritesService.findAll();

    return favorites;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = await this.favoritesService.addTrack(id);

    return track;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('artist/:id')
  async addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const artist = await this.favoritesService.addArtist(id);

    return artist;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = await this.favoritesService.addAlbum(id);

    return album;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  async removeArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const artist = await this.favoritesService.removeArtist(id);

    return artist;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  async removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const album = await this.favoritesService.removeAlbum(id);

    return album;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  async removeTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const track = await this.favoritesService.removeTrack(id);

    return track;
  }
}
