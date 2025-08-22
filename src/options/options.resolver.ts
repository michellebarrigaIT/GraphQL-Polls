import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OptionsService } from './options.service';
import { Option } from './entities/option.entity';
import { CreateOptionInput } from './dto/create-option.input';
import { UpdateOptionInput } from './dto/update-option.input';
import { Poll } from 'src/polls/entities/poll.entity';

@Resolver(() => Option)
export class OptionsResolver {
  constructor(private readonly optionsService: OptionsService) {}

  // @Mutation(() => [Option])
  // createOption(
  //   @Args('createOptionInputs', { type: () => [CreateOptionInput] }) createOptionInputs: CreateOptionInput[],
  //   @Args('poll', { type: () => Poll }) poll: Poll,
  // ) {
  //   return this.optionsService.create(createOptionInputs, poll);
  // }

  @Query(() => [Option], { name: 'options' })
  findAll() {
    return this.optionsService.findAll();
  }

  @Query(() => Option, { name: 'option' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.optionsService.findOne(id);
  }

  @Mutation(() => Option)
  updateOption(@Args('updateOptionInput') updateOptionInput: UpdateOptionInput) {
    return this.optionsService.update(updateOptionInput.id, updateOptionInput);
  }

  @Mutation(() => Option)
  removeOption(@Args('id', { type: () => Int }) id: number) {
    return this.optionsService.remove(id);
  }
}
