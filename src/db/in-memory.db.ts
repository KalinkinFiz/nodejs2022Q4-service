import { Injectable } from '@nestjs/common';

import { UserModel } from '../modules/users/user.model';
import { AlbumModel } from '../modules/albums/album.model';

@Injectable()
export class InMemoryDb {
  users: UserModel[] = [];
  albums: AlbumModel[] = [];
}
