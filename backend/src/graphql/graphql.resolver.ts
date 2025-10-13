import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GraphqlEntity } from './graphql.entity';
import { Param } from '@nestjs/common';

@Resolver(() => GraphqlEntity)
export class GraphqlResolver {
  private posts = [
    { id: '1', title: 'First Post', description: 'This is the first post' },
    { id: '2', title: 'Second Post', description: 'This is the second post' },
    { id: '3', title: 'Third Post', description: 'This is the third post' },
  ];

  @Query(() => [GraphqlEntity], { name: 'posts' })
  getPosts() {
    return this.posts;
  }

  @Query(() => [GraphqlEntity], { name: 'post' })
  getPost(@Param('id') id: string) {
    return this.posts?.find((post) => post.id === id);
  }

  @Mutation(() => GraphqlEntity)
  createPost(
    @Args('title') title: string,
    @Args('description') description: string,
  ) {
    const newPost = {
      id: String(this.posts.length + 1),
      title,
      description,
    };
    this.posts.push(newPost);
    return newPost;
  }
}
