import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

import { ArtistEntity } from './artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = this.artistRepository.create({
      ...createArtistDto,
    });

    return await this.artistRepository.save(artist);
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOne(id: string) {
    const artist = this.artistRepository.findOne({ where: { id } });

    if (!artist) return null;

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);

    if (!artist) throw new NotFoundException('Artist not found');

    const updatedArtist = Object.assign(artist, updateArtistDto);

    return await this.artistRepository.save(updatedArtist);
  }

  async remove(id: string) {
    const track = await this.artistRepository.delete(id);

    if (track.affected === 0) throw new NotFoundException('Artist not found');
  }
}
