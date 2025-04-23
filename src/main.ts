import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { swaggerConfig } from 'src/config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // config swagger
  swaggerConfig(app);
  const { PORT } = process.env;
  // set public folder
  app.setGlobalPrefix('api');
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/api/public/',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  await app.listen(PORT || 3000, '0.0.0.0', () => {
    console.log(`api: http://localhost:${PORT}`);
    console.log(`swagger: http://localhost:${PORT}/swagger`);
  });
}
bootstrap();
