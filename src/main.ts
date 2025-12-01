import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { writeFileSync } from 'node:fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

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
}
bootstrap();
