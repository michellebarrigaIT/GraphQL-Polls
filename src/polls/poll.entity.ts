import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Option } from '../options/entities/option.entity';

@ObjectType()
@Entity('polls')
export class Poll {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'poll_id' })
  pollId: number;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, user => user.polls, { onDelete: 'CASCADE' })
  @Field(() => User)
  createdBy: User;

  @OneToMany(() => Option, option => option.poll)
  @Field(() => [Option])
  options: Option[];
}
