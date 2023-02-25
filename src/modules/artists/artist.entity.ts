import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { AlbumEntity } from '../albums/album.entity';
import { TrackEntity } from '../tracks/track.entity';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artistId)
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.artistId)
  tracks: TrackEntity[];
}
