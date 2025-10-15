import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userModel.findById(id);
  }

  async create(name: string, email: string, password: string): Promise<User> {
    const newUser = new this.userModel({ name, email, password });
    return newUser.save();
  }

  async update(id: string, user: UpdateUserDto): Promise<User | null> {
    return await this.userModel.findByIdAndUpdate(id, user);
  }

  async delete(id: string): Promise<User | null> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
