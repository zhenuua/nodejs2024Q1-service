import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { EntityDoesNotExist, IncorrectPassword } from 'src/errors/errors';
import { ENTITIES } from 'src/constants';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async getUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new EntityDoesNotExist(ENTITIES.USER);
    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.getUser(id);
    return user;
  }

  async create(dto: UserDto) {
    const newUser = new User({ ...dto });
    newUser.id = randomUUID();
    const createdUser = this.userRepository.create(newUser);
    await this.userRepository.save(createdUser);
    const user = { ...createdUser };
    delete user.password;
    user.createdAt = 123;
    user.updatedAt = 123;
    return user;
  }

  async update(id: string, updateDto: any) {
    const { oldPassword, newPassword } = updateDto;
    const user = await this.getUser(id);

    if (oldPassword !== user.password) throw new IncorrectPassword();

    user.password = newPassword;
    await this.userRepository.save(user);
    delete user.password;
    user.createdAt = 123;
    user.updatedAt = 1234;
    return user;
  }

  async delete(id: string) {
    await this.getUser(id);
    await this.userRepository.delete(id);
  }
}
