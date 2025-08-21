import { Test, TestingModule } from '@nestjs/testing';
import { PollsResolver } from './polls.resolver';
import { PollsService } from './polls.service';

describe('PollsResolver', () => {
  let resolver: PollsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PollsResolver,
        PollsService,
        {
          provide: 'PollRepository',
          useValue: {},
        },
        {
          provide: 'OptionRepository',
          useValue: {},
        },
        {
          provide: 'UserRepository',
          useValue: {},
        },
        {
          provide: 'VoteRepository',
          useValue: {},
        },
        {
          provide: 'PUB_SUB',
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<PollsResolver>(PollsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
