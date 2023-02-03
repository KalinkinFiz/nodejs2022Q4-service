import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { InMemoryDb } from '../../db/in-memory.db';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private db: InMemoryDb) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = { ...createArtistDto, id: uuidv4() };

    this.db.artists.push(artist);

    return artist;
  }

  async findAll() {
    return this.db.artists;
  }

  async findOne(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);

    if (!artist) throw new NotFoundException('Artist not found');

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistId = this.db.artists.findIndex((artist) => artist.id === id);

    if (artistId === -1) throw new NotFoundException('Artist not found');

    const artist = Object.assign(this.db.artists[artistId], {
      ...updateArtistDto,
    });

    this.db.artists[artistId] = artist;

    return artist;
  }

  async remove(id: string) {
    const artistId = this.db.artists.findIndex((artist) => artist.id === id);

    if (artistId === -1) throw new NotFoundException('Artist not found');

    this.db.artists.splice(artistId, 1);
  }
}
