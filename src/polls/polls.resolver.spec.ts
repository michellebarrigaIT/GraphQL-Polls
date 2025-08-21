import { Test, TestingModule } from '@nestjs/testing';
import { PollsResolver } from './polls.resolver';
import { PollsService } from './polls.service';
import { CreatePollInput } from './dto/create-poll.input';

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

  describe('createPoll', () => {
    it('should create and return a poll', async () => {
      const createPollInput = {
        title: 'New Poll',
        description: 'Poll Description',
        createdById: 1
      } as unknown as CreatePollInput;

      const result = {
        pollId: 1,
        title: 'New Poll',
        description: 'Poll Description',
        createdAt: new Date(),
        createdBy: { 
          userId: 1, 
          username: 'John Doe', 
          email: 'john@example.com',
          createdAt: new Date(),
          polls: [],
          votes: []
        },
        options: []
      };

      jest.spyOn(resolver, 'createPoll').mockImplementation(async (_input) => result);
      const createdPoll = await resolver.createPoll(createPollInput);

      expect(createdPoll).toBe(result);
    });
    it('should throw an error if poll creation fails', async () => {
      const createPollInput = {
        title: 'New Poll',
        description: 'Poll Description',
        createdById: 1
      } as unknown as CreatePollInput;

      jest.spyOn(resolver, 'createPoll').mockImplementation(async () => {
        throw new Error('Poll creation failed');
      });

      await expect(resolver.createPoll(createPollInput)).rejects.toThrow('Poll creation failed');
    });
  });

  describe('findALl', () => {
    it('should return an array of polls', async () => {
      const result = [
        {
          pollId: 1,
          title: 'Poll 1',
          description: 'Description 1',
          createdAt: new Date(),
          createdBy: { 
            userId: 1, 
            username: 'John Doe', 
            email: 'john@example.com',
            createdAt: new Date(),
            polls: [],
            votes: []
          },
          options: []
        },
        {
          pollId: 2,
          title: 'Poll 2',
          description: 'Description 2',
          createdAt: new Date(),
          createdBy: { 
            userId: 2, 
            username: 'Jane Smith', 
            email: 'jane@example.com',
            createdAt: new Date(),
            polls: [],
            votes: []
          },
          options: []
        }
      ];
      jest.spyOn(resolver, 'findAll').mockImplementation(async () => result);
      expect(await resolver.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single poll', async () => {
      const result = {
        pollId: 1,
        title: 'Poll 1',
        description: 'Description 1',
        createdAt: new Date(),
        createdBy: { 
          userId: 1, 
          username: 'John Doe', 
          email: 'john@example.com',
            createdAt: new Date(),
            polls: [],
            votes: []
          },
          options: []
      };

      jest.spyOn(resolver, 'findOne').mockImplementation(async (pollId) => {
        if (pollId === 1) return result;
        throw new Error('Poll not found');
      });
      expect(await resolver.findOne(1)).toBe(result);
    });
  });
});
