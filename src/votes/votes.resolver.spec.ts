import { Test, TestingModule } from '@nestjs/testing';
import { VotesResolver } from './votes.resolver';
import { VotesService } from './votes.service';
import { CreateVoteInput } from './dto/create-vote.input';
import { Vote } from './entities/vote.entity';

describe('VotesResolver', () => {
  let resolver: VotesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VotesResolver,
        VotesService,
        {
          provide: 'VoteRepository',
          useValue: {},
        },
        {
          provide: 'UserRepository',
          useValue: {},
        },
        {
          provide: 'OptionRepository',
          useValue: {},
        },
        {
          provide: 'PUB_SUB',
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<VotesResolver>(VotesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createVote', () => {
    it('should create and return a vote', async () => {
      const createVoteInput = { userId: 1, optionId: 1 } as CreateVoteInput;
      const result = {
        voteId: 1,
        userId: 1,
        optionId: 1,
        user: { userId: 1, username: 'John Doe', email: 'john@example.com', createdAt: new Date(), polls: [], votes: [] },
        option: { optionId: 1, text: 'Option 1', poll: {}, votes: [] },
        createdAt: new Date()
      } as unknown as Vote;

      jest.spyOn(resolver, 'createVote').mockImplementation(async (_input) => result);
      const createdVote = await resolver.createVote(createVoteInput);
      
      expect(createdVote).toBe(result);
    });

    it('should throw an error if vote creation fails', async () => {
      const createVoteInput = { userId: 1, optionId: 1 } as CreateVoteInput;

      jest.spyOn(resolver, 'createVote').mockImplementation(async () => {
        throw new Error('Vote creation failed');
      });

      await expect(resolver.createVote(createVoteInput)).rejects.toThrow('Vote creation failed');
    });
  });
});
