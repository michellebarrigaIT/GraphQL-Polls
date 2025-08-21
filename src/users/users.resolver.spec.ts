import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        UsersService,
        {
          provide: 'UserRepository',
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserInput = { name: 'John Doe', email: 'john@example.com' };
      const result: User = {
        userId: 1,
        username: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date(),
        polls: [],
        votes: []
      };

      jest.spyOn(resolver['usersService'], 'create').mockResolvedValue(result);
      const user = await resolver.createUser(createUserInput as unknown as User);

      expect(user).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: User[] = [
        {
          userId: 1,
          username: 'John Doe',
          email: 'john@example.com',
          createdAt: new Date(),
          polls: [],
          votes: []
        },
        {
          userId: 2,
          username: 'Jane Doe',
          email: 'jane@example.com',
          createdAt: new Date(),
          polls: [],
          votes: []
        },
      ];

      jest.spyOn(resolver['usersService'], 'findAll').mockResolvedValue(result);
      const users = await resolver.findAll();

      expect(users).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const result: User = {
        userId: 1,
        username: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date(),
        polls: [],
        votes: []
      };

      jest.spyOn(resolver['usersService'], 'findOne').mockResolvedValue(result);
      const user = await resolver.findOne(1);

      expect(user).toBe(result);
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(resolver['usersService'], 'findOne').mockRejectedValue(new Error('User not found'));

      await expect(resolver.findOne(999)).rejects.toThrow('User not found');
    });
  }); 
});
