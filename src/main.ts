import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';
import {
  InternalServerErrorException,
  Logger,
  ValidationPipe,
} from '@nestjs/common';

import { PORT } from './environments';
import { AppDataSource } from './config.orm';

import { AppModule } from './app.module';

import { LoggingService } from './common/logger/logger.service';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: new LoggingService(),
    });

    AppDataSource.initialize()
      .then(() => {
        Logger.log(`🌨️  Database connected`, 'TypeORM');
      })
      .catch(() => {
        Logger.error(`❌  Database connect error`, '', 'TypeORM');
      });

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    const document = await readFile(
      join(__dirname, '..', 'doc/api.yaml'),
      'utf-8',
    );

    SwaggerModule.setup('doc', app, parse(document));

    const logger = new Logger('Exceptions');

    process.on('uncaughtException', async (error) => {
      logger.error(error);
    });
    process.on('unhandledRejection', async (reason) => {
      logger.error(reason);
    });

    await app.listen(PORT, () =>
      Logger.log(`🚀  Server ready at https://localhost:${PORT}`, 'Bootstrap'),
    );
  } catch (error) {
    Logger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false);
    throw new InternalServerErrorException(error);
  }
}

bootstrap().catch((err) => {
  Logger.error(`❌  Error starting server, ${err}`, '', 'Bootstrap', false);
  throw err;
});
