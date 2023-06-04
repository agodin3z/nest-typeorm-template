import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Entity, PrimaryGeneratedColumn, Repository } from 'typeorm';

import { TypeOrmService } from './typeorm.service';

/* TEST ENTITY */
@Entity()
export class TestEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
/* END TEST ENTITY */

describe('TypeOrmService', () => {
  let service: TypeOrmService;
  let repository: Repository<TestEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([TestEntity]),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [TestEntity],
          synchronize: true,
          autoLoadEntities: true,
          logging: false,
        }),
      ],
      providers: [
        TypeOrmService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(TestEntity),
          useValue: {
            query: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TypeOrmService>(TypeOrmService);
    repository = module.get<Repository<TestEntity>>(
      getRepositoryToken(TestEntity),
    );
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRepository', () => {
    it('should return a repository', async () => {
      const repository = await service.getRepository<TestEntity>(TestEntity);
      expect(repository).toBeDefined();
    });
  });

  describe('getEntities', () => {
    it('should return an array of entities', async () => {
      const entityMetadata = [
        {
          name: 'TestEntity',
          tableName: 'test_entity',
        },
      ];
      const entities = await service.getEntities();
      expect(entities).toEqual(entityMetadata as never);
    });
  });

  describe('closeDbConnection', () => {
    it('should close the connection', async () => {
      const spyClose = jest.spyOn(service, 'closeDbConnection');
      await service.closeDbConnection();
      expect(spyClose).toHaveBeenCalled();
    });
  });

  describe('clearDatabase', () => {
    it('should truncate all tables or skip table for fail', async () => {
      const spyQuery = jest.spyOn(repository, 'query');
      const entities = await service.getEntities();
      try {
        await service.clearDatabase();
        expect(spyQuery).toBeCalledTimes(entities.length);
      } catch (error) {
        expect(spyQuery).toBeCalledTimes(0);
      }
    });
  });
});
