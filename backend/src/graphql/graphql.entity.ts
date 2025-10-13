import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GraphqlEntity {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;
}
