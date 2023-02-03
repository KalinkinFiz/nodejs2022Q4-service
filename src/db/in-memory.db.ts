import { Injectable } from '@nestjs/common';

import { UserModel } from '../modules/users/user.model';

@Injectable()
export class InMemoryDb {
  users: UserModel[] = [];
}
