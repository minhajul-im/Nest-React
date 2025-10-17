import { Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { UsersService } from './user.service';
import { User } from './user.schema';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}
  @Query(() => [UserEntity], { name: 'users' })
  async getUsers(): Promise<UserEntity[]> {
    const users = (await this.usersService.findAll()) || [];
    return users.map((user: User) => ({
      _id: user._id as string,
      name: user.name,
      email: user.email,
    }));
  }
}
