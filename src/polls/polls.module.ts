import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { PollsResolver } from './polls.resolver';
import { Poll } from './entities/poll.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Poll])],
  providers: [PollsResolver, PollsService],
})
export class PollsModule {}
