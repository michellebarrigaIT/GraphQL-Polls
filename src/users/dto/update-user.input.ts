import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  userId: number;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;
}
