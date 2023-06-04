import { Logger, LogLevel, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import timeout from 'connect-timeout';
import * as fs from 'fs';
import helmet from 'helmet';

import { AppModule } from './app.module';

const getLogLevels = (prod: boolean): LogLevel[] => {
  if (prod) {
    return ['log', 'warn', 'error'];
  }
  return ['error', 'warn', 'log', 'verbose', 'debug'];
};

const logger = new Logger('Core API');
async function bootstrap(): Promise<void> {
  const globalPrefix = 'api';
  const { USE_SSL, NODE_ENV, SSL_PEM_FILE, SSL_CERT_FILE } = process.env;
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: getLogLevels(NODE_ENV === 'production'),
    ...(USE_SSL === 'true'
      ? {
          httpsOptions: {
            key: fs.readFileSync(SSL_PEM_FILE),
            cert: fs.readFileSync(SSL_CERT_FILE),
          },
        }
      : {}),
  });
  const config = app.get(ConfigService);

  app.setGlobalPrefix(globalPrefix);

  app.use(timeout('45s'));
  app.use(
    helmet({
      contentSecurityPolicy:
        config.get('NODE_ENV') !== 'production' ? false : undefined,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (config.get<boolean>('ENABLE_DOCUMENTATION')) {
    const options = new DocumentBuilder()
      .setTitle('Nest API')
      .setDescription('The Nest API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const docs = SwaggerModule.createDocument(app, options, {});
    SwaggerModule.setup('/docs', app, docs);
  }

  const port = config.get<number>('PORT') ?? 3000;
  await app.listen(port, () => {
    logger.log(
      `🚀 ${config.get<string>(
        'NODE_ENV',
      )} server ready at http://localhost:${port}/${globalPrefix}`,
    );
  });
}
bootstrap();
