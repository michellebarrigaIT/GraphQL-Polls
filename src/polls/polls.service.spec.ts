import { Test, TestingModule } from '@nestjs/testing';
import { PollsService } from './polls.service';
import { Poll } from 'src/polls/entities/poll.entity';

describe('PollsService', () => {
  let service: PollsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PollsService,
        {
          provide: 'PollRepository',
          useValue: {},
        },
        {
          provide: 'OptionRepository',
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<PollsService>(PollsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
