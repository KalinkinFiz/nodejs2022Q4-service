import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { InMemoryDb } from '../../db/in-memory.db';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UpdateTrackDto } from '../tracks/dto/update-track.dto';

import { TrackService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class AlbumService {
  constructor(
    private db: InMemoryDb,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    const album = { ...createAlbumDto, id: uuidv4() };

    this.db.albums.push(album);

    return album;
  }

  findAll() {
    return this.db.albums;
  }

  findOne(id: string) {
    const album = this.db.albums.find((album) => album.id === id);

    if (!album) return null;

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumId = this.db.albums.findIndex((album) => album.id === id);

    if (albumId === -1) throw new NotFoundException('Album not found');

    const album = Object.assign(this.db.albums[albumId], {
      ...updateAlbumDto,
    });

    this.db.albums[albumId] = album;

    return album;
  }

  remove(id: string) {
    const albumId = this.db.albums.findIndex((album) => album.id === id);

    if (albumId === -1) throw new NotFoundException('Album not found');

    this.db.albums.splice(albumId, 1);

    const tracks = this.trackService.findAll();

    tracks.forEach((track) => {
      if (track.albumId === id) {
        const updateTrackDto = new UpdateTrackDto();
        updateTrackDto.albumId = null;
        this.trackService.update(track.id, updateTrackDto);
      }
    });

    this.favoritesService.removeAlbum(id, true);
  }
}
