import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  Put,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

import { AlbumService } from './albums.service';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    const album = this.albumService.create(createAlbumDto);

    return album;
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    const albums = this.albumService.findAll();

    return albums;
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = this.albumService.findOne(id);

    if (!album) throw new NotFoundException('Track not found');

    return album;
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = this.albumService.update(id, updateAlbumDto);

    return album;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = this.albumService.remove(id);

    return album;
  }
}
