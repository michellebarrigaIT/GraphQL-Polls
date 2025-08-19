import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './resolver.module';
import { DatabaseModule } from './config/database.config';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { OptionsModule } from './options/options.module';
import { PollsModule } from './polls/polls.module';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), '/schema.gql'),
      playground: true,
    }),
    UsersModule,
    OptionsModule,
    PollsModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
