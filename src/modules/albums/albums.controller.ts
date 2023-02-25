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

import { AlbumEntity } from './album.entity';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    return await this.albumService.create(createAlbumDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<AlbumEntity[]> {
    return await this.albumService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<AlbumEntity> {
    const album = await this.albumService.findOne(id);

    if (!album) throw new NotFoundException('Album not found');

    return album;
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    return await this.albumService.update(id, updateAlbumDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.albumService.remove(id);
  }
}
