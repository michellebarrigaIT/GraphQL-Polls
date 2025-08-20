import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOptionInput {
  @Field()
  text: string;
}
