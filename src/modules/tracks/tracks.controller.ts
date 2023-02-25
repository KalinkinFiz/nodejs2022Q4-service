import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

import { TrackService } from './tracks.service';

import { TrackEntity } from './track.entity';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    return await this.trackService.create(createTrackDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<TrackEntity[]> {
    return await this.trackService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<TrackEntity> {
    const track = await this.trackService.findOne(id);

    if (!track) throw new NotFoundException('Track not found');

    return track;
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    return await this.trackService.update(id, updateTrackDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.trackService.remove(id);
  }
}
