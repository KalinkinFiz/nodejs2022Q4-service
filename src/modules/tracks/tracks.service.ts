import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

import { TrackEntity } from './track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = this.trackRepository.create(createTrackDto);

    return await this.trackRepository.save(track);
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });

    if (!track) return null;

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findOne(id);

    if (!track) throw new NotFoundException('Track not found');

    const updatedTrack = Object.assign(track, updateTrackDto);

    return await this.trackRepository.save(updatedTrack);
  }

  async remove(id: string) {
    const track = await this.trackRepository.delete(id);

    if (track.affected === 0) throw new NotFoundException('Track not found');
  }
}
