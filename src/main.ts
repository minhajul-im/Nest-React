import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
    allowedHeaders: 'Content-Type, Accept',
  });

  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(8080);
}

bootstrap();
