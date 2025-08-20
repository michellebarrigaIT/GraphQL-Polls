import { CreateOptionInput } from 'src/options/dto/create-option.input';
import { CreatePollInput } from './create-poll.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePollInput extends PartialType(CreatePollInput) {
  @Field(() => Int)
  pollId: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [CreateOptionInput], { nullable: true })
  options?: CreateOptionInput[];
}
