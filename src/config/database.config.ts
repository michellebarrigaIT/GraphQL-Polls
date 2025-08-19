import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Poll } from "src/polls/entities/poll.entity";
import { User } from "src/users/entities/user.entity";
import { Vote } from "src/votes/entities/vote.entity";
import { Option } from "src/options/entities/option.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5433', 10),
      username: process.env.POSTGRES_USER || 'postgres',
      password: (process.env.DB_PASSWORD || 'password').trim(),
      database: (process.env.POSTGRES_DB || 'polls').trim(),
      entities: [
        User, 
        Poll,
        Option,
        Vote,
    ],
      synchronize: true,
    }),
  ],
})

export class DatabaseModule {}
