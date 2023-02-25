import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

import { AlbumEntity } from './album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = this.albumRepository.create(createAlbumDto);

    return await this.albumRepository.save(album);
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });

    if (!album) return null;

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.findOne(id);

    if (!album) throw new NotFoundException('Album not found');

    const updatedAlbum = Object.assign(album, updateAlbumDto);

    return await this.albumRepository.save(updatedAlbum);
  }

  async remove(id: string) {
    const track = await this.albumRepository.delete(id);

    if (track.affected === 0) throw new NotFoundException('Album not found');
  }
}
