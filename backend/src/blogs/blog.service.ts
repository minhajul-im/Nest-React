import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './blog.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async findAll(): Promise<Blog[]> {
    return await this.blogModel.find().exec();
  }
  async findOne(id: string): Promise<Blog | null> {
    return await this.blogModel.findById(id).exec();
  }
  async create(
    title: string,
    description: string,
    image?: string,
  ): Promise<Blog> {
    const newBlog = new this.blogModel({ title, description, image });
    return await newBlog.save();
  }
}
