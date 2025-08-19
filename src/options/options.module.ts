import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsResolver } from './options.resolver';

@Module({
  providers: [OptionsResolver, OptionsService],
})
export class OptionsModule {}
