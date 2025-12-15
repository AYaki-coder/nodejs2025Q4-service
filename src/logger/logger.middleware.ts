import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggerService) {
    this.logger.setContext('HTTP');
  }

  use(req: any, res: any, next: () => void) {
    const startTime = Date.now();

    this.logger.log(`Incoming Request: ${req.method} ${req.url}`, 'Request');

    let responseBody: any;

    const originalSend = res.send;

    res.send = (body) => {
      responseBody = body;
      return originalSend.call(res, body);
    };

    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const statusCode = res.statusCode;

      const queryParamsStr = `\nQuery params: ${JSON.stringify(req.query, null, 4)}`;

      const requestBodyStr = req.body
        ? `\nRequest body:${JSON.stringify(req.body, null, 4)}`
        : '';
      const responseBodyStr = responseBody
        ? `\nResponse body:${JSON.stringify(responseBody, null, 4)}`
        : '';
      const message = ` ${statusCode} ${req.method} ${req.url} - ${duration}ms${queryParamsStr}${requestBodyStr}${responseBodyStr}\n\n`;

      if (statusCode >= 500) {
        this.logger.error(message, '', 'Response');
      } else if (statusCode >= 400) {
        this.logger.warn(message, 'Response');
      } else {
        this.logger.log(message, 'Response');
      }
    });

    next();
  }
}
