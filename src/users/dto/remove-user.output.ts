import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class RemoveUserOutput {
  @Field()
  message: string;
}
