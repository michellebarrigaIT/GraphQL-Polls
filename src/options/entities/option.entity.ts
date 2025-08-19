import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Poll } from '../../polls/poll.entity';
import { Vote } from '../../votes/vote.entity';

@ObjectType()
@Entity('options')
export class Option {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'option_id' })
  optionId: number;

  @Field()
  @Column()
  text: string;

  @ManyToOne(() => Poll, poll => poll.options, { onDelete: 'CASCADE' })
  @Field(() => Poll)
  poll: Poll;

  @OneToMany(() => Vote, vote => vote.option)
  @Field(() => [Vote])
  votes: Vote[];
}
