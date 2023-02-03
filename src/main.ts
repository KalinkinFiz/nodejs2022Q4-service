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

import { AppModule } from './app.module';

import { PORT } from './environments';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    const document = await readFile(
      join(__dirname, '..', 'doc/api.yaml'),
      'utf-8',
    );

    SwaggerModule.setup('doc', app, parse(document));

    await app.listen(PORT, () =>
      Logger.log(`🚀  Server ready at https://localhost:${PORT}`, 'Bootstrap'),
    );
  } catch (error) {
    Logger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false);
    throw new InternalServerErrorException(error);
  }
}

bootstrap().catch(() => {
  process.exit(1);
});
