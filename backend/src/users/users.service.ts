import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from './users.dto';
import { users } from './db';

@Injectable()
export class UsersService {
  getUsers(): UserDto[] {
    return users;
  }

  getUser(id: number): UserDto {
    const user = users?.find((user: UserDto) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  createUser(user: CreateUserDto): UserDto {
    const newUser = {
      id: users.length + 1,
      ...user,
    };
    users.push(newUser);
    return newUser;
  }

  updateUser(user: UpdateUserDto, id: number): UserDto {
    const findUser = users.findIndex((user: UserDto) => user.id === id);
    if (!findUser) {
      throw new Error('User not found');
    }
    const userUpdated = (users[findUser] = { ...users[findUser], ...user });
    return userUpdated;
  }

  deleteUser(id: number): string {
    const findUser = users.findIndex((user: UserDto) => user.id === id);
    if (!findUser) {
      throw new Error('User not found');
    }
    users.splice(findUser, 1);

    return 'User has been deleted successfully';
  }
}
