import { Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { UsersService } from './user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}
  @Query(() => [UserEntity], { name: 'users' })
  async getUsers() {
    const users = (await this.usersService.findAll()) || [];
    return users;
  }
}
