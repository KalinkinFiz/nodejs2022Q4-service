import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { ArtistEntity } from '../artists/artist.entity';
import { TrackEntity } from '../tracks/track.entity';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;

  @Column({ nullable: true })
  artistId: string;

  @OneToMany(() => TrackEntity, (track) => track.albumId)
  tracks: TrackEntity[];
}
