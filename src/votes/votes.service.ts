import { Inject, Injectable } from '@nestjs/common';
import { CreateVoteInput } from './dto/create-vote.input';
import { UpdateVoteInput } from './dto/update-vote.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { User } from 'src/users/entities/user.entity';
import { Option } from 'src/options/entities/option.entity';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class VotesService {

  constructor(
    @InjectRepository(Vote)
    private readonly votesRepository: Repository<Vote>,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  async create(createVoteInput: CreateVoteInput): Promise<Vote> {
    const existingVote = await this.checkIfUserHasVotedInPoll(createVoteInput.userId, createVoteInput.optionId);

    let vote: Vote;

    if (existingVote) {
      existingVote.option = { optionId: createVoteInput.optionId } as Option;
      vote = await this.votesRepository.save(existingVote);
    } else {
      vote = this.votesRepository.create({
        user: { userId: createVoteInput.userId } as User,
        option: { optionId: createVoteInput.optionId } as Option,
      });
      vote = await this.votesRepository.save(vote);
    }

    const voteWithRelations = await this.votesRepository.findOne({
      where: { voteId: vote.voteId },
      relations: ['user', 'option', 'option.poll', 'option.votes'],
    });
    if (!voteWithRelations) {
      throw new Error(`Vote with ID ${vote.voteId} not found`);
    }

    this.pubSub.publish('voteAdded', { 
      onVote: { 
        pollId: voteWithRelations.option.poll.pollId,
        optionId: voteWithRelations.option.optionId,
        votesCount: voteWithRelations.option.votes.length,
      }
    });

    return voteWithRelations;
  }

  findAll() {
    return `This action returns all votes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vote`;
  }

  async update(id: number, updateVoteInput: UpdateVoteInput) {
    const existingVote = await this.votesRepository.findOne({ where: { voteId: id } });
    if (!existingVote) {
      throw new Error(`Vote with ID ${id} not found`);
    }

    const userHasVoted = await this.checkIfUserHasVoted(updateVoteInput.userId, updateVoteInput.optionId);
    if (userHasVoted) {
      throw new Error(`User has already voted for this option`);
    }

    existingVote.user = { userId: updateVoteInput.userId } as User;
    existingVote.option = { optionId: updateVoteInput.optionId } as Option;

    const updatedVote = await this.votesRepository.save(existingVote);

    return updatedVote;
  }

  remove(voteId: number) {
    const vote = this.votesRepository.findOne({ where: { voteId } });
    
    if (!vote) {
      throw new Error(`Vote with ID ${voteId} not found`);
    }

    return this.votesRepository.delete(voteId);
  }

  private async checkIfUserHasVoted(userId: number, optionId: number): Promise<boolean> {
    const existingVote = await this.votesRepository.findOne({
      where: { user: { userId }, option: { optionId } },
    });
    return !!existingVote;
  }

  private async checkIfUserHasVotedInPoll(
    userId: number,
    optionId: number
  ): Promise<Vote | null> {
    const existingVote = await this.votesRepository.createQueryBuilder('vote')
      .innerJoin('vote.user', 'user')
      .innerJoin('vote.option', 'option')
      .innerJoin('option.poll', 'poll')
      .where('user.userId = :userId', { userId })
      .andWhere('poll.pollId = (SELECT "pollPollId" FROM options WHERE "option_id" = :optionId)', { optionId })
      .getOne();

    return existingVote;
  }
}
