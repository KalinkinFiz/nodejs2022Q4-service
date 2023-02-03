export class ArtistEntity {
  id!: string;

  name: string;

  artistId: string | null;

  albumId: string | null;

  duration: number;

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }
}
