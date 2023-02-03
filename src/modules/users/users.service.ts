import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { InMemoryDb } from '../../db/in-memory.db';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UserEntity } from './users.entity';

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

    if (oldPassword !== this.db.users[userId].password)
      throw new ForbiddenException('Incorrect old password');

    this.db.users[userId].password = newPassword;
    ++this.db.users[userId].version;
    this.db.users[userId].updatedAt = Date.now();

    return this.db.users[userId];
  }

  async remove(id: string) {
    const userId = this.db.users.findIndex((user) => user.id === id);

    if (userId === -1) throw new NotFoundException('User not found');

    this.db.users = [
      ...this.db.users.slice(0, userId),
      ...this.db.users.slice(userId + 1),
    ];
  }
}
