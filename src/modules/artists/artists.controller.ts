import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  Put,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

import { ArtistService } from './artists.service';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    const artist = this.artistService.create(createArtistDto);

    return artist;
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    const artists = this.artistService.findAll();

    return artists;
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const artist = this.artistService.findOne(id);

    if (!artist) throw new NotFoundException('Track not found');

    return artist;
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = this.artistService.update(id, updateArtistDto);

    return artist;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const artist = this.artistService.remove(id);

    return artist;
  }
}
