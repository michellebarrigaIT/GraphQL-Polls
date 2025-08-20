import { InputType, Int, Field } from '@nestjs/graphql';
import { CreateOptionInput } from '../../options/dto/create-option.input';

@InputType()
export class CreatePollInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  userId: number;

  @Field(() => [CreateOptionInput])
  options: CreateOptionInput[];
}
