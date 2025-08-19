import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OptionsService } from './options.service';
import { Option } from './entities/option.entity';
import { CreateOptionInput } from './dto/create-option.input';
import { UpdateOptionInput } from './dto/update-option.input';

@Resolver(() => Option)
export class OptionsResolver {
  constructor(private readonly optionsService: OptionsService) {}

  @Mutation(() => Option)
  createOption(@Args('createOptionInput') createOptionInput: CreateOptionInput) {
    return this.optionsService.create(createOptionInput);
  }

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
