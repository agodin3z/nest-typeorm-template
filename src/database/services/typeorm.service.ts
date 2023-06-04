import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TypeOrmService {
  private readonly logger: Logger = new Logger(TypeOrmService.name);
  private readonly configService: ConfigService = new ConfigService();
  connection: DataSource;
  constructor(connection: DataSource) {
    this.connection = connection;
  }

  async getRepository<T>(entity): Promise<Repository<T>> {
    return this.connection.getRepository(entity);
  }

  async getEntities(): Promise<any[]> {
    const entities = [];
    (await (await this.connection).entityMetadatas).forEach((x) =>
      entities.push({ name: x.name, tableName: x.tableName }),
    );
    return entities;
  }

  async closeDbConnection(): Promise<void> {
    const connection = await this.connection;
    if (connection.isInitialized) {
      await (await this.connection).destroy();
    }
  }

  async clearDatabase(): Promise<void> {
    const connection = await this.connection;
    const entities = connection.entityMetadatas;

    for (const entity of entities) {
      try {
        const repository = await this.getRepository(entity.name);
        await repository.query(
          `TRUNCATE TABLE "${
            this.configService.get('DATABASE_SCHEMA') ||
            this.configService.get('DATABASE_NAME')
          }"."${entity.tableName}" RESTART IDENTITY CASCADE;`,
        );
      } catch (error) {
        this.logger.error(error);
      }
    }
  }
}
