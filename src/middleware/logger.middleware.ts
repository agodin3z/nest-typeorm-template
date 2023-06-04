import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(`HTTP`);
  use(req: Request, res: Response, next: NextFunction): void {
    res.on('finish', () => {
      const { ip, method, originalUrl, hostname, headers, body } = req;
      const { statusCode, statusMessage } = res;
      const message = `${ip} - ${method} ${originalUrl} - ${statusCode}: ${statusMessage} - ${hostname} "${
        headers['user-agent']
      }" - Body: ${JSON.stringify(body)}`;
      if (statusCode >= 500) {
        return this.logger.error(message);
      }
      if (statusCode >= 400) {
        return this.logger.warn(message);
      }
      return this.logger.log(message);
    });
    next();
  }
}
