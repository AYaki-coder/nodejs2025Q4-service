import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'node:path';
import * as fs from 'node:fs';

@Injectable()
export class LoggerService extends ConsoleLogger {
  private readonly minimumLogLevel: number;
  private currentContext?: string;
  private maxSizeKiloBytes: number;
  private logFilePath: string;
  private errorLogFilePath: string;

  constructor(private configService: ConfigService) {
    super();
    this.maxSizeKiloBytes =
      +this.configService.get<string>('MAX_LOG_FILE_SIZE_BYTES') * 1024 ||
      10240;
    this.logFilePath = this.configService.get<string>(
      'LOG_FILE_PATH',
      './logs/app.log',
    );
    this.errorLogFilePath = this.configService.get<string>(
      'ERROR_LOG_FILE_PATH',
      './logs/error.log',
    );
    const logDir = path.dirname(this.logFilePath);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    this.minimumLogLevel =
      parseInt(this.configService.get<string>('LOG_LEVEL')) ?? 2;
  }

  setContext(context: string) {
    this.currentContext = context;
  }

  async log(message: string, context?: string) {
    if (this.isLevelEnabled('log')) {
      super.log(message, context || this.currentContext);

      await this.writeToFile(
        message,
        context || this.currentContext,
        this.logFilePath,
      );
    }
  }

  async error(message: string, trace: string, context?: string) {
    if (this.isLevelEnabled('error')) {
      super.error(message, trace, context || this.currentContext);
      await this.writeToFile(
        JSON.stringify({ message, trace }, null, 4),
        context || this.currentContext,
        this.errorLogFilePath,
      );
    }
  }

  async warn(message: string, context?: string) {
    if (this.isLevelEnabled('warn')) {
      super.warn(message, context || this.currentContext);
      await this.writeToFile(
        message,
        context || this.currentContext,
        this.logFilePath,
      );
    }
  }

  async debug(message: string, context?: string) {
    if (this.isLevelEnabled('debug')) {
      super.debug(message, context || this.currentContext);
      await this.writeToFile(
        message,
        context || this.currentContext,
        this.logFilePath,
      );
    }
  }

  async verbose(message: string, context?: string) {
    if (this.isLevelEnabled('verbose')) {
      super.verbose(message, context || this.currentContext);
      await this.writeToFile(
        message,
        context || this.currentContext,
        this.logFilePath,
      );
    }
  }

  async fatal(message: string, context?: string) {
    if (this.isLevelEnabled('fatal')) {
      super.fatal(message, context || this.currentContext);
      await this.writeToFile(
        message,
        context || this.currentContext,
        this.logFilePath,
      );
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

  private async writeToFile(
    message: string,
    context: string,
    filePath: string,
  ) {
    const timestamp = Date.now();
    const logMessage = `[${timestamp}] [${context || this.currentContext}] ${message}\n`;

    try {
      const stats = await fs.promises.stat(filePath);

      if (stats.size > this.maxSizeKiloBytes) {
        const newFilePath = `${filePath}.${timestamp}.old`;

        await fs.promises.rename(filePath, newFilePath);
      }
    } catch (e) {}

    await fs.promises.appendFile(filePath, logMessage, 'utf8');
  }
}
