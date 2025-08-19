import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PollsService } from './polls.service';
import { Poll } from './entities/poll.entity';
import { CreatePollInput } from './dto/create-poll.input';
import { UpdatePollInput } from './dto/update-poll.input';

@Resolver(() => Poll)
export class PollsResolver {
  constructor(private readonly pollsService: PollsService) {}

  @Mutation(() => Poll)
  createPoll(@Args('createPollInput') createPollInput: CreatePollInput) {
    return this.pollsService.create(createPollInput);
  }

  @Query(() => [Poll], { name: 'polls' })
  findAll() {
    return this.pollsService.findAll();
  }

  @Query(() => Poll, { name: 'poll' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.pollsService.findOne(id);
  }

  @Mutation(() => Poll)
  updatePoll(@Args('updatePollInput') updatePollInput: UpdatePollInput) {
    return this.pollsService.update(updatePollInput.id, updatePollInput);
  }

  @Mutation(() => Poll)
  removePoll(@Args('id', { type: () => Int }) id: number) {
    return this.pollsService.remove(id);
  }
}
