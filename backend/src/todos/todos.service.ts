import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './schema/todos.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TodosService {
  constructor(@InjectModel('Todo') private todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto) {
    const todo = new this.todoModel(createTodoDto);
    const result = await todo.save();
    return result;
  }

  async findAll() {
    const time = Date.now();
    const result = (await this.todoModel.find().exec()) || [];
    return [
      ...result,
      { _id: 'test-id', title: `Test-${time}`, description: 'test' },
    ];
  }

  async findOne(id: string) {
    return this.todoModel.findById(id);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const result = await this.todoModel.updateOne(
      { _id: id },
      { $set: updateTodoDto },
    );
    return result;
  }

  async remove(id: string) {
    const result = await this.todoModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return { message: 'Todo not found' };
    }
    return { message: 'Deleted Successfully' };
  }
}
