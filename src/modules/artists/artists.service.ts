import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { InMemoryDb } from '../../db/in-memory.db';

import { AlbumService } from '../albums/albums.service';
import { FavoritesService } from '../favorites/favorites.service';
import { TrackService } from '../tracks/tracks.service';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { UpdateAlbumDto } from '../albums/dto/update-album.dto';
import { UpdateTrackDto } from '../tracks/dto/update-track.dto';

@Injectable()
export class ArtistService {
  constructor(
    private db: InMemoryDb,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    const artist = { ...createArtistDto, id: uuidv4() };

    this.db.artists.push(artist);

    return artist;
  }

  findAll() {
    return this.db.artists;
  }

  findOne(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);

    if (!artist) return null;

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistId = this.db.artists.findIndex((artist) => artist.id === id);

    if (artistId === -1) throw new NotFoundException('Artist not found');

    const artist = Object.assign(this.db.artists[artistId], {
      ...updateArtistDto,
    });

    this.db.artists[artistId] = artist;

    return artist;
  }

  remove(id: string) {
    const artistId = this.db.artists.findIndex((artist) => artist.id === id);

    if (artistId === -1) throw new NotFoundException('Artist not found');

    this.db.artists.splice(artistId, 1);

    const albums = this.albumService.findAll();

    albums.forEach((album) => {
      if (album.artistId === id) {
        const updateAlbumDto = new UpdateAlbumDto();
        updateAlbumDto.artistId = null;
        this.albumService.update(album.id, updateAlbumDto);
      }
    });

    const tracks = this.trackService.findAll();

    tracks.forEach((track) => {
      if (track.artistId === id) {
        const updateTrackDto = new UpdateTrackDto();
        updateTrackDto.artistId = null;
        this.trackService.update(track.id, updateTrackDto);
      }
    });

    this.favoritesService.removeArtist(id, true);
  }
}
