import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { ArtistEntity } from '../artists/artist.entity';
import { AlbumEntity } from '../albums/album.entity';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @ManyToOne(() => AlbumEntity, (album) => album.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  album: AlbumEntity;

  @Column({ nullable: true })
  albumId: string;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;

  @Column({ nullable: true })
  artistId: string;
}
