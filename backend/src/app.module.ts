import { join } from 'path';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/user.module';
import { ChatModule } from './chat/chat.module';
import { GraphqlModule } from './blogs/blog.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UploadController } from './file/upload.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs_db'),
    UsersModule,
    ChatModule,
    GraphqlModule,
  ],
  controllers: [UploadController],
  providers: [],
})
export class AppModule {}
