import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseLogger } from './database.logger';
import { TypeOrmService } from './services/typeorm.service';
import { typeOrmConfig } from './typeorm.config';

@Module({
  controllers: [],
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...typeOrmConfig(),
        retryAttempts: 2,
        logger: new DatabaseLogger(),
        autoLoadEntities: true,
        seeders: [__dirname + '/seeds/*.seed.ts'],
        cli: {
          migrationsDir: __dirname + '/migrations',
        },
      }),
    }),
  ],
  providers: [TypeOrmService],
  exports: [TypeOrmService],
})
export class DatabaseModule {}
