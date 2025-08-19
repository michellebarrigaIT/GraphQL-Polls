import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Option } from '../../options/entities/option.entity';

@ObjectType()
@Entity('votes')
@Unique(['user', 'option'])
export class Vote {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'vote_id' })
  voteId: number;

  @ManyToOne(() => User, user => user.votes, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;

  @ManyToOne(() => Option, option => option.votes, { onDelete: 'CASCADE' })
  @Field(() => Option)
  option: Option;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
