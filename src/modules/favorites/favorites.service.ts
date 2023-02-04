import { Injectable, NotFoundException } from '@nestjs/common';

import { InMemoryDb } from '../../db/in-memory.db';

@Injectable()
export class FavoritesService {
  constructor(private db: InMemoryDb) {}

  async findAll() {
    return this.db.favourites;
  }

  async addArtist(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);

    if (!artist) throw new NotFoundException('Artist not found');

    this.db.favourites.artists.push(artist);

    return artist;
  }

  async addAlbum(id: string) {
    const album = this.db.albums.find((album) => album.id === id);

    if (!album) throw new NotFoundException('Album not found');

    this.db.favourites.albums.push(album);

    return album;
  }

  async addTrack(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);

    if (!track) throw new NotFoundException('Track not found');

    this.db.favourites.tracks.push(track);

    return track;
  }

  async removeArtist(id: string) {
    const artistId = this.db.favourites.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (artistId === -1) throw new NotFoundException('Artist not found');

    this.db.favourites.artists.splice(artistId, 1);
  }

  async removeAlbum(id: string) {
    const albumId = this.db.favourites.albums.findIndex(
      (album) => album.id === id,
    );

    if (albumId === -1) throw new NotFoundException('Album not found');

    this.db.favourites.albums.splice(albumId, 1);
  }

  async removeTrack(id: string) {
    const trackId = this.db.favourites.tracks.findIndex(
      (track) => track.id === id,
    );

    if (trackId === -1) throw new NotFoundException('Track not found');

    this.db.favourites.tracks.splice(trackId, 1);
  }
}
