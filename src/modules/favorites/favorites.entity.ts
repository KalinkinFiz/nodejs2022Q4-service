import { ArtistEntity } from '../artists/artist.entity';
import { AlbumEntity } from '../albums/album.entity';
import { TrackEntity } from '../tracks/track.entity';

export class FavoriteEntity {
  artists: ArtistEntity[];

  albums: AlbumEntity[];

  tracks: TrackEntity[];

  constructor(partial: Partial<FavoriteEntity>) {
    Object.assign(this, partial);
  }
}
