import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { InMemoryDb } from '../../db/in-memory.db';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(private db: InMemoryDb) {}

  async create(createUserDto: CreateUserDto) {
    const date = Date.now();
    const newUser = new UserEntity({
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: date,
      updatedAt: date,
    });

    this.db.users.push(newUser);

    return newUser;
  }

  async findAll() {
    return this.db.users;
  }

  async findOne(id: string) {
    const user = this.db.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userId = this.db.users.findIndex((user) => user.id === id);

    if (userId === -1) throw new NotFoundException('User not found');

    const { oldPassword, newPassword } = updateUserDto;

    const user = await this.findOne(id);

    if (oldPassword !== user.password)
      throw new ForbiddenException('Incorrect old password');

    user.password = newPassword;
    ++user.version;
    user.updatedAt = Date.now();

    return user;
  }

  async remove(id: string) {
    const userId = this.db.users.findIndex((user) => user.id === id);

    if (userId === -1) throw new NotFoundException('User not found');

    this.db.users.splice(userId, 1);
  }
}
