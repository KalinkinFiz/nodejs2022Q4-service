import * as bcrypt from 'bcrypt';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  JWT_SECRET_KEY,
  JWT_SECRET_REFRESH_KEY,
  TOKEN_EXPIRE_TIME,
  TOKEN_REFRESH_EXPIRE_TIME,
} from '../environments';

import { CreateUserDto } from '../modules/users/dto/create-user.dto';

import { UserService } from '../modules/users/users.service';
import { UserEntity } from '../modules/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  async validateUser(login: string, password: string) {
    const user = await this.userService.findByLogin(login);
    if (!user) return null;

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) return null;

    return user;
  }

  async login(user: UserEntity) {
    const { id, login } = user;

    const accessToken = await this.jwtService.signAsync(
      { userId: id, login },
      {
        secret: JWT_SECRET_KEY,
        expiresIn: TOKEN_EXPIRE_TIME,
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        userId: id,
        login,
      },
      {
        secret: JWT_SECRET_REFRESH_KEY,
        expiresIn: TOKEN_REFRESH_EXPIRE_TIME,
      },
    );

    return { accessToken, refreshToken };
  }

  async refresh(body: { refreshToken: string }) {
    const { refreshToken } = body;

    if (!refreshToken) throw new UnauthorizedException('No refresh token');

    try {
      const { userId, login } = this.jwtService.verify(refreshToken);
      const user = new UserEntity({ id: userId, login });

      return await this.login(user);
    } catch {
      throw new ForbiddenException('Refresh token is outdated or invalid');
    }
  }
}
