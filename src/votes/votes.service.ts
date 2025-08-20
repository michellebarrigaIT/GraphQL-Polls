import { Injectable } from '@nestjs/common';
import { CreateVoteInput } from './dto/create-vote.input';
import { UpdateVoteInput } from './dto/update-vote.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { User } from 'src/users/entities/user.entity';
import { Option } from 'src/options/entities/option.entity';

@Injectable()
export class VotesService {

  constructor(
    @InjectRepository(Vote)
    private readonly votesRepository: Repository<Vote>,
  ) {}

  async create(createVoteInput: CreateVoteInput) {
    const vote = this.votesRepository.create({
      user: { userId: createVoteInput.userId } as User,
      option: { optionId: createVoteInput.optionId } as Option
    });

    const savedVote = await this.votesRepository.save(vote);

    return await this.votesRepository.findOne({ where: { voteId: savedVote.voteId }, relations: ['user', 'option'] });
  }

  findAll() {
    return `This action returns all votes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vote`;
  }

  update(id: number, updateVoteInput: UpdateVoteInput) {
    return `This action updates a #${id} vote`;
  }

  remove(id: number) {
    return `This action removes a #${id} vote`;
  }
}
