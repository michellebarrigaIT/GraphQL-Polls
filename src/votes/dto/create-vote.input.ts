import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateVoteInput {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  optionId: number;
}
