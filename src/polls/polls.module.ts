import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { PollsResolver } from './polls.resolver';

@Module({
  providers: [PollsResolver, PollsService],
})
export class PollsModule {}
