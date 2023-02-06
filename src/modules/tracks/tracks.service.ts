import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { InMemoryDb } from '../../db/in-memory.db';
import { FavoritesService } from '../favorites/favorites.service';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(
    private db: InMemoryDb,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  create(createTrackDto: CreateTrackDto) {
    const track = { ...createTrackDto, id: uuidv4() };

    this.db.tracks.push(track);

    return track;
  }

  findAll() {
    return this.db.tracks;
  }

  findOne(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);

    if (!track) return null;

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackId = this.db.tracks.findIndex((track) => track.id === id);

    if (trackId === -1) throw new NotFoundException('Track not found');

    const updatedTrack = Object.assign(this.db.tracks[trackId], {
      ...updateTrackDto,
    });

    this.db.tracks[trackId] = updatedTrack;

    return updatedTrack;
  }

  remove(id: string) {
    const trackId = this.db.tracks.findIndex((track) => track.id === id);

    if (trackId === -1) throw new NotFoundException('Track not found');

    this.db.tracks.splice(trackId, 1);

    this.favoritesService.removeTrack(id, true);
  }
}
