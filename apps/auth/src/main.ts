import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  console.log('auth service is running');
  const app = await NestFactory.create(AuthModule);
  app.useLogger(app.get(Logger));
  await app.listen(3001);
}
bootstrap();
