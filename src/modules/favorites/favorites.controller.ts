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
  findAll() {
    const favorites = this.favoritesService.findAll();

    return favorites;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = this.favoritesService.addTrack(id);

    return track;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const artist = this.favoritesService.addArtist(id);

    return artist;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = this.favoritesService.addAlbum(id);

    return album;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  removeArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const artist = this.favoritesService.removeArtist(id);

    return artist;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  removeAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = this.favoritesService.removeAlbum(id);

    return album;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  removeTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = this.favoritesService.removeTrack(id);

    return track;
  }
}
