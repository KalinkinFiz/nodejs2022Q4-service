import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', async () => {
      const message = `\n ⛩   REQUEST: ${req.method} 
      URL: ${req.url}, 
      BODY: ${JSON.stringify(req.body)}
      STATUS CODE: ${res.statusCode}\n`;

      this.logger.log(message);
    });
    next();
  }
}
