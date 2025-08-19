import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    const user = this.usersRepository.create(createUserInput);
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(userId: number) {
    return this.usersRepository.findOne({ where: { userId: userId } });
  }

  async update(userId: number, updateUserInput: UpdateUserInput) {
    await this.usersRepository.update(userId, updateUserInput);

    const updatedUser = await this.usersRepository.findOne({ where: { userId: userId } });

    if (!updatedUser) {
      throw new Error(`User with id ${userId} not found`);
    }

    return updatedUser;
  }

  remove(userId: number) {
    return this.usersRepository.delete(userId);
  }
}
