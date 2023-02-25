import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { AlbumService } from '../albums/albums.service';
import { ArtistService } from '../artists/artists.service';
import { TrackService } from '../tracks/tracks.service';

import { FavoritesEntity } from './favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private readonly favoritesRepository: Repository<FavoritesEntity>,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  async create() {
    const favorites = this.favoritesRepository.create();

    favorites.tracksIds = [];
    favorites.albumsIds = [];
    favorites.artistsIds = [];

    await this.favoritesRepository.save(favorites);
  }

  async getFavorites() {
    let favorites = await this.favoritesRepository.find();

    if (favorites.length === 0) {
      await this.create();
      favorites = await this.favoritesRepository.find();
    }

    return favorites[0];
  }

  async findAll() {
    const { albumsIds, artistsIds, tracksIds } = await this.getFavorites();

    const albumsObjects = await Promise.all(
      albumsIds.map((albumId) => this.albumService.findOne(albumId)),
    );

    const artistsObjects = await Promise.all(
      artistsIds.map((artistId) => this.artistService.findOne(artistId)),
    );

    const tracksObjects = await Promise.all(
      tracksIds.map((trackId) => this.trackService.findOne(trackId)),
    );

    return {
      albums: albumsObjects.filter((album) => album),
      artists: artistsObjects.filter((artist) => artist),
      tracks: tracksObjects.filter((track) => track),
    };
  }

  async addArtist(artistId: string) {
    const artist = await this.artistService.findOne(artistId);

    if (!artist) throw new UnprocessableEntityException('Artist not found');

    const favorites = await this.getFavorites();
    favorites.artistsIds.push(artistId);

    await this.favoritesRepository.save(favorites);
  }

  async addAlbum(albumId: string) {
    const album = await this.albumService.findOne(albumId);

    if (!album) throw new UnprocessableEntityException('Album not found');

    const favorites = await this.getFavorites();
    favorites.albumsIds.push(albumId);

    await this.favoritesRepository.save(favorites);
  }

  async addTrack(trackId: string) {
    const track = await this.trackService.findOne(trackId);

    if (!track) throw new UnprocessableEntityException('Track not found');

    const favorites = await this.getFavorites();
    favorites.tracksIds.push(trackId);

    await this.favoritesRepository.save(favorites);
  }

  async removeArtist(id: string, skipError = false) {
    const favorites = await this.getFavorites();
    const artistId = favorites.artistsIds.findIndex(
      (artistId) => artistId === id,
    );

    if (artistId === -1 && !skipError)
      throw new NotFoundException('Artist not found');

    favorites.artistsIds.splice(artistId, 1);
    await this.favoritesRepository.save(favorites);
  }

  async removeAlbum(id: string, skipError = false) {
    const favorites = await this.getFavorites();
    const albumId = favorites.albumsIds.findIndex((albumId) => albumId === id);

    if (albumId === -1 && !skipError)
      throw new NotFoundException('Album not found');

    favorites.albumsIds.splice(albumId, 1);
    await this.favoritesRepository.save(favorites);
  }

  async removeTrack(id: string, skipError = false) {
    const favorites = await this.getFavorites();
    const trackId = favorites.tracksIds.findIndex((trackId) => trackId === id);

    if (trackId === -1 && !skipError)
      throw new NotFoundException('Track not found');

    favorites.tracksIds.splice(trackId, 1);
    await this.favoritesRepository.save(favorites);
  }
}
