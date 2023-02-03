import { Module } from '@nestjs/common';

import { UserService } from './users.service';
import { UserController } from './users.controller';
import { DbModule } from '../../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
