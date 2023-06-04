import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

export const typeOrmConfig = (): any => {
  const conf = new ConfigService();
  return {
    type: 'postgres',
    host: conf.get('DATABASE_HOST'),
    port: conf.get<number>('DATABASE_PORT'),
    username: conf.get('DATABASE_USERNAME'),
    password: conf.get('DATABASE_PASSWORD'),
    database: conf.get('DATABASE_NAME'),
    synchronize: false,
    subscribers: [`${__dirname}/../modules/**/*.subscriber{.ts,.js}`],
    migrationsTableName: 'migrations',
    migrations: [`${__dirname}/migrations/*.ts`],
  };
};
export default new DataSource({
  ...typeOrmConfig(),
  entities: [__dirname + '/../modules/**/*.entity.ts'],
  seeders: [`${__dirname}/seeds/*.seed.ts`],
  seeds: ['src/**/*.seed{.ts,.js}'],
  cli: {
    migrationsDir: __dirname + '/migrations',
  },
});
