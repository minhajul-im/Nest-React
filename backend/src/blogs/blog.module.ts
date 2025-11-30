import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogResolver } from './blog.resolver';
import { Blog, BlogSchema } from './blog.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogService } from './blog.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  providers: [BlogResolver, BlogService],
})
export class BlogModule {}
