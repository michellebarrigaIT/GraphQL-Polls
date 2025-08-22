import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsResolver } from './options.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { Poll } from 'src/polls/entities/poll.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Option, Poll])],
  providers: [OptionsResolver, OptionsService],
  exports: [OptionsService]
})
export class OptionsModule {}
