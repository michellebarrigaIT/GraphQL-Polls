import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { PollsResolver } from './polls.resolver';
import { Poll } from './entities/poll.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from '../options/entities/option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Poll, Option])],
  providers: [PollsResolver, PollsService],
})
export class PollsModule {}
