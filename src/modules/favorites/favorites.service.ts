import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { InMemoryDb } from '../../db/in-memory.db';

import { AlbumService } from '../albums/albums.service';
import { ArtistService } from '../artists/artists.service';
import { TrackService } from '../tracks/tracks.service';

@Injectable()
export class FavoritesService {
  constructor(
    private db: InMemoryDb,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  findAll() {
    const favorites = this.db.favorites;

    return favorites;
  }

  addArtist(id: string) {
    const artist = this.artistService.findOne(id);

    if (!artist) throw new UnprocessableEntityException('Artist not found');

    this.db.favorites.artists.push(artist);
  }

  addAlbum(id: string) {
    const album = this.albumService.findOne(id);

    if (!album) throw new UnprocessableEntityException('Album not found');

    this.db.favorites.albums.push(album);
  }

  addTrack(id: string) {
    const track = this.trackService.findOne(id);

    if (!track) throw new UnprocessableEntityException('Track not found');

    this.db.favorites.tracks.push(track);
  }

  removeArtist(id: string, skipError = false) {
    const artistId = this.db.favorites.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (artistId === -1 && !skipError)
      throw new NotFoundException('Artist not found');

    this.db.favorites.artists.splice(artistId, 1);
  }

  removeAlbum(id: string, skipError = false) {
    const albumId = this.db.favorites.albums.findIndex(
      (album) => album.id === id,
    );

    if (albumId === -1 && !skipError)
      throw new NotFoundException('Album not found');

    this.db.favorites.albums.splice(albumId, 1);
  }

  removeTrack(id: string, skipError = false) {
    const trackId = this.db.favorites.tracks.findIndex(
      (track) => track.id === id,
    );

    if (trackId === -1 && !skipError)
      throw new NotFoundException('Track not found');

    this.db.favorites.tracks.splice(trackId, 1);
  }
}
