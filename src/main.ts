import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { writeFileSync } from 'node:fs';
import { GlobalHttpExceptionFilter } from './global-exception-filter';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapterHost = app.get(HttpAdapterHost);
  const loggerService = app.get(LoggerService);

  loggerService.setContext('Bootstrap');

  process.on('uncaughtException', (error, origin) => {
    loggerService.error(
      `UNCAUGHT EXCEPTION: ${error.message}`,
      error.stack || origin,
      'Process',
    );

    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    loggerService.error(
      `UNHANDLED REJECTION: ${reason instanceof Error ? reason.message : String(reason)}`,
      reason instanceof Error ? reason.stack : 'No trace available',
      'Process',
    );
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new GlobalHttpExceptionFilter(httpAdapterHost, loggerService),
  );

  const config = new DocumentBuilder()
    .setTitle('Home Library Service API')
    .setDescription('API documentation for the music library project')
    .setVersion('1.0')
    .addTag('artists')
    .addTag('albums')
    .addTag('tracks')
    .addTag('favorites')
    .addTag('app')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const yamlDocument = yaml.dump(document);

  writeFileSync('./doc/api.yaml', yamlDocument);

  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT ?? 4000);

  // setTimeout(() => {
  //   throw new Error('uncaughtException for cross-check');
  // }, 3000);

  // setTimeout(() => {
  //   return Promise.reject('unhandledRejection for cross-check');
  // }, 3000);
}
bootstrap();
