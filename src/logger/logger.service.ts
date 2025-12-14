import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggerService extends ConsoleLogger {
  private readonly minimumLogLevel: number;
  private currentContext?: string;

  constructor(private configService: ConfigService) {
    super();

    this.minimumLogLevel =
      parseInt(this.configService.get<string>('LOG_LEVEL')) || 2;
  }

  setContext(context: string) {
    this.currentContext = context;
  }

  log(message: string, context?: string) {
    if (this.isLevelEnabled('log')) {
      super.log(message, context || this.currentContext);
    }
  }

  error(message: string, trace: string, context?: string) {
    if (this.isLevelEnabled('error')) {
      super.error(message, trace, context || this.currentContext);
    }
  }

  warn(message: string, context?: string) {
    if (this.isLevelEnabled('warn')) {
      super.warn(message, context || this.currentContext);
    }
  }

  debug(message: string, context?: string) {
    if (this.isLevelEnabled('debug')) {
      super.debug(message, context || this.currentContext);
    }
  }

  verbose(message: string, context?: string) {
    if (this.isLevelEnabled('verbose')) {
      super.verbose(message, context || this.currentContext);
    }
  }

  fatal(message: string, context?: string) {
    if (this.isLevelEnabled('fatal')) {
      super.fatal(message, context || this.currentContext);
    }
  }

  isLevelEnabled(level: LogLevel): boolean {
    const levelMap: Record<LogLevel, number> = {
      error: 0,
      warn: 1,
      log: 2,
      verbose: 3,
      debug: 4,
      fatal: 5,
    };
    return levelMap[level] <= this.minimumLogLevel;
  }
}
