import { Injectable } from '@nestjs/common';
import { DB } from 'src/database/db.service';
import { UserDto } from './dto/user.dto';
import { IUser } from 'src/types';
import { EntityDoesNotExist, IncorrectPassword } from 'src/errors/errors';
import { ENTITIES } from 'src/constants';

@Injectable()
export class UserService {
  constructor(private db: DB) { }

  findAll(): IUser[] {
    return this.db.user.findAll();
  }

  findOne(id: string) {
    const user = this.db.user.findOne(id);
    if (!user) throw new EntityDoesNotExist(ENTITIES.TRACK);
    return user;
  }

  create(dto: UserDto) {
    return this.db.user.create(dto);
  }

  async update(id: string, updateDto: any) {
    const user = this.findOne(id);
    if (!user) throw new EntityDoesNotExist(ENTITIES.TRACK);
    if (user.password !== updateDto.oldPassword) throw new IncorrectPassword();
    user.password = updateDto.newPassword;
    user.updatedAt = Date.now();
    user.version++;
    this.db.user.delete(user);
    return this.db.user.update(user);
  }

  delete(id: string) {
    const user = this.findOne(id);
    if (!user) throw new EntityDoesNotExist(ENTITIES.TRACK);
    return this.db.user.delete(user);
  }
}
