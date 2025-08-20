import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PollsService } from './polls.service';
import { Poll } from './entities/poll.entity';
import { CreatePollInput } from './dto/create-poll.input';
import { UpdatePollInput } from './dto/update-poll.input';
import { OptionsService } from 'src/options/options.service';
import { Repository } from 'typeorm';
import { Option } from 'src/options/entities/option.entity';

@Resolver(() => Poll)
export class PollsResolver {
  constructor(
    private readonly pollsService: PollsService,
  ) {}

  @Mutation(() => Poll)
  createPoll(@Args('createPollInput') createPollInput: CreatePollInput) {
    const poll = this.pollsService.create(createPollInput);
    return poll;
  }

  @Query(() => [Poll], { name: 'polls' })
  async findAll() {
    return await this.pollsService.findAll();
  }

  @Query(() => Poll, { name: 'poll' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.pollsService.findOne(id);
  }

  @Mutation(() => Poll)
  updatePoll(@Args('updatePollInput') updatePollInput: UpdatePollInput) {
    return this.pollsService.update(updatePollInput.pollId, updatePollInput);
  }

  @Mutation(() => Poll)
  removePoll(@Args('id', { type: () => Int }) id: number) {
    return this.pollsService.remove(id);
  }
}
