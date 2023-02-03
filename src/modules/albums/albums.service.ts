import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { InMemoryDb } from '../../db/in-memory.db';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private db: InMemoryDb) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = { ...createAlbumDto, id: uuidv4() };

    this.db.albums.push(album);

    return album;
  }

  async findAll() {
    return this.db.albums;
  }

  async findOne(id: string) {
    const album = this.db.albums.find((album) => album.id === id);

    if (!album) throw new NotFoundException('Album not found');

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumId = this.db.albums.findIndex((album) => album.id === id);

    if (albumId === -1) throw new NotFoundException('Album not found');

    const updatedAlbum = Object.assign(this.db.albums[albumId], {
      ...updateAlbumDto,
    });

    this.db.albums[albumId] = updatedAlbum;

    return updatedAlbum;
  }

  async remove(id: string) {
    const albumId = this.db.albums.findIndex((album) => album.id === id);

    if (albumId === -1) throw new NotFoundException('Album not found');

    this.db.albums.splice(albumId, 1);
  }
}
