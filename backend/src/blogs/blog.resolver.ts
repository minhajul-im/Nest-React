import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GraphqlEntity } from './blog.entity';
import { Param } from '@nestjs/common';

@Resolver(() => GraphqlEntity)
export class GraphqlResolver {
  private posts: Array<PostType> = [];

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
    @Args('image', { nullable: true }) image?: string,
  ) {
    const newPost = {
      id: String(this.posts.length + 1),
      title,
      description,
      image: image || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.posts.push(newPost);
    return newPost;
  }
}

interface PostType {
  id: string;
  title: string;
  description: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}
