import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BlogEntity } from './blog.entity';
import { BlogService } from './blog.service';

@Resolver(() => BlogEntity)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Query(() => [BlogEntity], { name: 'posts' })
  getPosts() {
    return this.blogService.findAll();
  }

  @Mutation(() => BlogEntity, { name: 'createPost' })
  createPost(
    @Args('title') title: string,
    @Args('description') description: string,
    @Args('image', { nullable: true }) image?: string,
  ) {
    return this.blogService.create(title, description, image);
  }
}
