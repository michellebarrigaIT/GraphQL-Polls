import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class RemoveVoteOutput {
  @Field()
  message: string;
}
