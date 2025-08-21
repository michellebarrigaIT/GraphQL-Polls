import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VotesService } from './votes.service';
import { Vote } from './entities/vote.entity';
import { CreateVoteInput } from './dto/create-vote.input';
import { UpdateVoteInput } from './dto/update-vote.input';
import { RemoveVoteOutput } from './dto/remove-vote.output';

@Resolver(() => Vote)
export class VotesResolver {
  constructor(private readonly votesService: VotesService) {}

  @Mutation(() => Vote)
  async createVote(@Args('createVoteInput') createVoteInput: CreateVoteInput) {
    return await this.votesService.create(createVoteInput);
  }

  @Query(() => [Vote], { name: 'votes' })
  findAll() {
    return this.votesService.findAll();
  }

  @Query(() => Vote, { name: 'vote' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.votesService.findOne(id);
  }

  @Mutation(() => Vote)
  updateVote(@Args('updateVoteInput') updateVoteInput: UpdateVoteInput) {
    return this.votesService.update(updateVoteInput.voteId, updateVoteInput);
  }

  @Mutation(() => RemoveVoteOutput)
  removeVote(@Args('voteId', { type: () => Int }) voteId: number): Promise<RemoveVoteOutput> {
    return this.votesService.remove(voteId);
  }
}
