import { Module } from '@nestjs/common';

import { LoggingService } from './logger/logger.service';

@Module({
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggerModule {}
