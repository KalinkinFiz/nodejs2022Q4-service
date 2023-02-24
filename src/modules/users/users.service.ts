import bcrypt from 'bcrypt';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UserEntity } from './user.entity';

import { CRYPT_SALT } from '../../environments';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;

    createUserDto.password = await bcrypt.hash(password, CRYPT_SALT);

    const createUser = new UserEntity(createUserDto);

    const user = this.userRepository.create(createUser);

    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findByLogin(login: string) {
    return await this.userRepository.findOne({ where: { login } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    const { oldPassword, newPassword } = updateUserDto;

    if (oldPassword !== user.password)
      throw new ForbiddenException('Incorrect old password');

    user.password = newPassword;

    return await this.userRepository.save(user);
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) throw new NotFoundException('User not found');
  }
}
