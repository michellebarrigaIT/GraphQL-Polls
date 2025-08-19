import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Poll } from '../polls/poll.entity';
import { Vote } from '../votes/vote.entity';
@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Poll, poll => poll.createdBy)
  polls: Poll[];

  @OneToMany(() => Vote, vote => vote.user)
  votes: Vote[];
}
