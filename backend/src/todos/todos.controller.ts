import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

let counter = 0;

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @Header('Cache-Control', 'public, max-age=60, stale-while-revalidate=30')
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  @Header('Cache-Control', 'private, max-age=30, stale-while-revalidate=100')
  findOne(@Param('id') id: string) {
    console.log('controller counter', counter++);
    return this.todosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }

  @Get('test/must')
  @Header(
    'Cache-Control',
    'private, max-age=10, stale-while-revalidate=100, must-revalidate',
  )
  testMustRevalidate() {
    let time = Date.now();
    console.log('must-revalidate hit!', time);
    return { data: 'MUST REVALIDATE', time };
  }

  @Get('test/immutable')
  @Header('Cache-Control', 'public, max-age=60, immutable')
  testImmutable() {
    const time = Date.now();
    console.log('immutable hit!', time);

    return { data: 'IMMUTABLE', version: 'v1', time: time };
  }
}
