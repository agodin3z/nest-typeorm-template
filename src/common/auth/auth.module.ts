import { CacheModule, Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as cacheManager from 'cache-manager';
import * as chokidar from 'chokidar';
import * as fs from 'fs';
import path from 'path';

import { UsersModule } from '../../modules/users/users.module';
import { ApiKeyStrategy } from './strategies/api-key.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    CacheModule.registerAsync({
      useFactory: async () => {
        const logger: Logger = new Logger('CacheModule');
        const jsCode = fs.readFileSync(
          path.join(__dirname, process.env.ALLOWED_API_KEYS),
          'utf8',
        );
        const allowedKeys = eval(jsCode) as string[];
        const watcher = chokidar.watch(
          path.join(__dirname, process.env.ALLOWED_API_KEYS),
        );
        const ttl = 0;
        const store = await cacheManager.caching('memory', {
          ttl,
          max: 100,
        });
        await store.set('allowedApiKeys', allowedKeys);
        logger.debug(`Allowed Api Keys: ${allowedKeys.length}`);

        watcher.on('change', async () => {
          const jsCode = fs.readFileSync(
            path.join(__dirname, process.env.ALLOWED_API_KEYS),
            'utf8',
          );
          const allowedKeys = eval(jsCode) as string[];
          logger.debug(`Allowed Api Keys changed to: ${allowedKeys.length}`);
          await store.set('allowedApiKeys', allowedKeys);
        });

        return { store, ttl };
      },
      inject: [ConfigService],
    }),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXP') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ApiKeyStrategy, JwtStrategy],
  exports: [],
})
export class AuthModule {}
