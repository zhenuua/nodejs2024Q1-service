import { Injectable } from '@nestjs/common';
import { UpdatePasswordDto, UserDto } from './dto/user.dto';
import { BadRequest, EntityDoesNotExist, NotCorrect } from 'src/errors/errors';
import { ENTITIES } from 'src/constants';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { hash } from 'bcrypt';
import { isCorrectPassword } from 'src/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new EntityDoesNotExist(ENTITIES.USER);
    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findByLogin(login: string) {
    return await this.userRepository.findOne({
      where: { login },
    });
  }

  async findOne(id: string) {
    const user = await this.getUser(id);
    return user;
  }

  async getHashPassword(newPassword: string) {
    return await hash(newPassword, Number(process.env.CRYPT_SALT));
  }

  async create(dto: UserDto) {
    if (!dto.login || !dto.password) throw new BadRequest();
    dto.password = await this.getHashPassword(dto.password);

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

  async update(id: string, dto: UpdatePasswordDto) {
    const user = await this.findOne(id);

    if (!(await isCorrectPassword(dto.oldPassword, user.password)))
      throw new NotCorrect();

    await this.userRepository.update(
      { id },
      {
        password: await this.getHashPassword(dto.newPassword),
      },
    );

    const updatedUser = await this.findOne(id);
    await delete updatedUser.password;
    return updatedUser;
  }

  async delete(id: string) {
    await this.getUser(id);
    await this.userRepository.delete(id);
  }
}
