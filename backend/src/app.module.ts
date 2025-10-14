import { join } from 'path';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { GraphqlModule } from './blog/blog.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UploadController } from './file/upload.controller';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    UsersModule,
    ChatModule,
    GraphqlModule,
  ],
  controllers: [UploadController],
  providers: [],
})
export class AppModule {}
