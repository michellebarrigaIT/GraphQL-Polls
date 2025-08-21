import { Injectable } from '@nestjs/common';
import { CreateOptionInput } from './dto/create-option.input';
import { UpdateOptionInput } from './dto/update-option.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './entities/option.entity';
import { Poll } from 'src/polls/entities/poll.entity';

@Injectable()
export class OptionsService {

  constructor(
    @InjectRepository(Option)
    private readonly optionsRepository: Repository<Option>,
  ) {}

  async create(listOptions: CreateOptionInput[], savedPoll: Poll) {
    const options = listOptions.map((opt) =>
      this.optionsRepository.create({
        text: opt.text,
        poll: savedPoll,
      }),
    );

    savedPoll.options = await this.optionsRepository.save(options);

    return savedPoll.options;
  }

  findAll() {
    return `This action returns all options`;
  }

  findOne(id: number) {
    return `This action returns a #${id} option`;
  }

  update(id: number, updateOptionInput: UpdateOptionInput) {
    return `This action updates a #${id} option`;
  }

  remove(id: number) {
    return `This action removes a #${id} option`;
  }
}
