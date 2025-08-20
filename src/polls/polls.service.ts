import { Injectable } from '@nestjs/common';
import { CreatePollInput } from './dto/create-poll.input';
import { UpdatePollInput } from './dto/update-poll.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Poll } from './entities/poll.entity';
import { Repository } from 'typeorm';
import { OptionsService } from 'src/options/options.service';
import { Option } from 'src/options/entities/option.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PollsService {

  constructor(
    @InjectRepository(Poll)
    private readonly pollsRepository: Repository<Poll>,
     @InjectRepository(Option)
    private readonly optionsRepository: Repository<Option>,
  ) {}

  async create(createPollInput: CreatePollInput) {
    if (!createPollInput.options || createPollInput.options.length < 2) {
      throw new Error('At least two option is required to create a poll');
    }

    const poll = this.pollsRepository.create({
      title: createPollInput.title,
      description: createPollInput.description,
      createdBy: { userId: createPollInput.userId } as User,
    });

    const savedPoll = await this.pollsRepository.save(poll);

    const options = createPollInput.options.map((opt) =>
      this.optionsRepository.create({
        text: opt.text,
        poll: savedPoll,
      }),
    );

    savedPoll.options = await this.optionsRepository.save(options);

    return savedPoll;
  }



  findAll() {
    return `This action returns all polls`;
  }

  findOne(id: number) {
    return `This action returns a #${id} poll`;
  }

  update(id: number, updatePollInput: UpdatePollInput) {
    return `This action updates a #${id} poll`;
  }

  remove(id: number) {
    return `This action removes a #${id} poll`;
  }
}
