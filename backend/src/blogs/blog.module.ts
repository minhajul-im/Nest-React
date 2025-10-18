import { Module } from '@nestjs/common';
import { GraphqlController } from './blog.controller';
import { GraphqlResolver } from './blog.resolver';

@Module({
  controllers: [GraphqlController],
  providers: [GraphqlResolver],
})
export class GraphqlModule {}
