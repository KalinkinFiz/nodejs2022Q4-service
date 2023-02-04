import { Injectable } from '@nestjs/common';

import { UserModel } from './models/user.model';
import { AlbumModel } from './models/album.model';
import { ArtistModel } from './models/artist.model';
import { TrackModel } from './models/track.model';
import { FavoritesModel } from './models/favorites.model';

@Injectable()
export class InMemoryDb {
  users: UserModel[] = [];
  albums: AlbumModel[] = [];
  artists: ArtistModel[] = [];
  tracks: TrackModel[] = [];
  favourites: FavoritesModel = {
    artists: [],
    tracks: [],
    albums: [],
  };
}
