import * as path from 'path';
import { ConsoleLogger } from '@nestjs/common';
import { readdir, mkdir, appendFile, stat, writeFile } from 'fs/promises';

import { LOG_FILE_SIZE_KB, LOG_LEVEL } from '../../environments';

export class LoggingService extends ConsoleLogger {
  private fileSize = LOG_FILE_SIZE_KB * 1024;
  private logLevel = LOG_LEVEL;

  constructor() {
    super();
  }

  async log(message: any, context?: string) {
    super.log(message, context);

    await saveLog('log', message, this.fileSize);
  }

  async error(error: any, stack?: string, context?: string) {
    if (this.logLevel < 1) return;

    super.error(error, stack, context);

    if (error instanceof Error) {
      const { message, name } = error;
      const errorMessage = `${name}: ${message}\n ${context}`;

      await saveLog('error', errorMessage, this.fileSize);
    } else {
      const errorMessage = `${stack}: ${error}`;

      await saveLog('error', errorMessage, this.fileSize);
    }
  }

  async warn(message: any, context?: string) {
    if (this.logLevel < 2) return;

    super.warn(message, context);

    await saveLog('warn', message, this.fileSize);
  }

  debug(message: any, context?: string) {
    if (this.logLevel < 3) return;

    super.debug(message, context);
  }

  verbose(message: any, context?: string) {
    if (this.logLevel < 4) return;

    super.verbose(message, context);
  }
}

async function saveLog(name: string, message: string, fileSize: number) {
  await mkdir(path.join(process.cwd(), `logs/${name}s`), { recursive: true });

  const dirname = path.resolve(process.cwd(), `logs/${name}s`);
  const ls = await readdir(dirname);

  let order = ls.length === 0 ? 0 : ls.length - 1;
  let filename = ls[ls.length - 1] || generateFileName(name, order);

  if (ls.length === 0) {
    await createFile(dirname, filename);
  }

  const { size } = await stat(path.resolve(dirname, filename));
  const dateSize = Buffer.byteLength(new Date().toLocaleString(), 'utf-8');
  const messageSize = Buffer.byteLength(message, 'utf-8');

  if (size + messageSize + dateSize >= fileSize) {
    order += 1;
    filename = generateFileName(name, order);
    await createFile(dirname, filename);
  }

  await appendFile(
    path.resolve(dirname, filename),
    `${new Date().toLocaleString()} - ${message}\n`,
  );
}

function generateFileName(name: string, order: number) {
  return order === 0 ? `${name}.txt` : `${name}${order}.txt`;
}

async function createFile(dirname: string, filename: string) {
  return await writeFile(path.resolve(dirname, filename), '');
}
