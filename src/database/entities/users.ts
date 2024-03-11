import { randomUUID } from 'crypto';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { IUser } from 'src/types';

export const users = new Map<string, IUser>();

const findAllUser = () => {
  return [...users.values()];
};

const findUser = (id: string) => {
  return users.get(id);
};

const createUser = (dto: UserDto) => {
  const time = Date.now();
  const user = {
    id: randomUUID(),
    login: dto.login,
    password: dto.password,
    version: 1,
    createdAt: time,
    updatedAt: time,
  };

  users.set(user.id, user);

  const userWithoutPassword = {
    id: user.id,
    login: user.login,
    version: user.version,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  return userWithoutPassword;
};

const updateUser = (user: IUser) => {
  users.set(user.id, user);

  const userWithoutPassword = {
    id: user.id,
    login: user.login,
    version: user.version,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  return userWithoutPassword;
};

const deleteUser = (user: IUser) => {
  users.delete(user.id);

  const userWithoutPassword = {
    id: user.id,
    login: user.login,
    version: user.version,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  return userWithoutPassword;
};

export const getUsersMethods = () => ({
  findAll: findAllUser,
  findOne: findUser,
  create: createUser,
  update: updateUser,
  delete: deleteUser,
});
