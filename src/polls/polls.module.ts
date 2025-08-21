import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { PollsResolver } from './polls.resolver';
import { Poll } from './entities/poll.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from '../options/entities/option.entity';
import { pubSub } from '../pubsub.provider';
import { OptionsModule } from 'src/options/options.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Poll, Option]),
    OptionsModule,
  ],
  providers: [
    PollsResolver, 
    PollsService,
    {
      provide: 'PUB_SUB',
      useValue: pubSub,
    },
  ],
})
export class PollsModule {}
