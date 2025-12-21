import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  Req,
  Res,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import * as crypto from 'crypto';
import type { Request, Response } from 'express';

@Controller('api/v1/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    const data = await this.todosService.findAll();

    const body = JSON.stringify(data);
    const etag = crypto.createHash('md5').update(body).digest('hex');

    const clientEtag = req.headers['if-none-match'];

    if (clientEtag && clientEtag === etag) {
      res.status(304).end();
      return;
    }
    res.set('ETag', etag);
    return res.json(data);
  }

  @Get(':id')
  @Header(
    'Cache-Control',
    'private, max-age=30, stale-while-revalidate=100, mast-revalidate',
  )
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }

  @Get('test/must')
  @Header(
    'Cache-Control',
    'private, max-age=30, stale-while-revalidate=100, immutable',
  )
  testMustRevalidate() {
    let time = Date.now();
    console.log('must-revalidate hit!', time);
    return { data: 'MUST REVALIDATE', version: 'v1', time };
  }

  @Get('test/immutable')
  @Header('Cache-Control', 'public, immutable')
  testImmutable() {
    const time = Date.now();
    console.log('immutable hit!', time);

    return { data: 'IMMUTABLE', version: 'v1' };
  }
}
