import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogResolver } from './blog.resolver';
import { Blog, BlogSchema } from './blog.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  providers: [BlogResolver],
})
export class BlogModule {}
