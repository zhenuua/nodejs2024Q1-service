import { UUID } from 'src/dto/uuid.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UpdatePasswordDto } from './dto/user.dto';
import { ENTITIES } from 'src/constants';
import { User } from './user.entity';

@Controller(ENTITIES.USER)
export class UserController {
  constructor(private userService: UserService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll() {
    return await this.userService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param() { id }: UUID): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: UserDto) {
    return await this.userService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async update(@Param() { id }: UUID, @Body() updateDto: UpdatePasswordDto) {
    return await this.userService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() { id }: UUID) {
    return this.userService.delete(id);
  }
}
