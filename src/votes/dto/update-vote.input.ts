import { CreateVoteInput } from './create-vote.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVoteInput extends PartialType(CreateVoteInput) {
  @Field(() => Int)
  voteId: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  optionId: number;
}
