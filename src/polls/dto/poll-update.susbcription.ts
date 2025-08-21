import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class PollUpdate {
  @Field(() => Int)
  pollId: number;

  @Field(() => [OptionVotes])
  options: OptionVotes[];
}

@ObjectType()
export class OptionVotes {
  @Field(() => Int)
  optionId: number;

  @Field(() => Int)
  votesCount: number;
}