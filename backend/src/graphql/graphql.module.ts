import { Module } from '@nestjs/common';
import { GraphqlController } from './graphql.controller';
import { GraphqlResolver } from './graphql.resolver';

@Module({
  controllers: [GraphqlController],
  providers: [GraphqlResolver],
})
export class GraphqlModule {}
