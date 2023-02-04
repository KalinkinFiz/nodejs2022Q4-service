import { ArtistModel } from './artist.model';
import { AlbumModel } from './album.model';
import { TrackModel } from './track.model';

export interface FavoritesModel {
  artists: ArtistModel[];
  albums: AlbumModel[];
  tracks: TrackModel[];
}
