import { Injectable } from '@nestjs/common';
import { CreateOptionInput } from './dto/create-option.input';
import { UpdateOptionInput } from './dto/update-option.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './entities/option.entity';

@Injectable()
export class OptionsService {

  constructor(
    @InjectRepository(Option)
    private readonly optionsRepository: Repository<Option>,
  ) {}

  create(createOptionInput: CreateOptionInput) {
    const option = this.optionsRepository.create(createOptionInput);
    return this.optionsRepository.save(option);
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
