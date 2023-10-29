import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import * as dotenv from 'dotenv';

declare const module: any;

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));

  const config = new DocumentBuilder()
    .setTitle('Github-monitoring API')
    .setDescription(
      'API para el monitoreo de actividades de repositorio en GitHub',
    )
    .setVersion('1.0')
    .build();

  app.enableCors({
    origin: [
      'http://localhost:4000',
      'http://192.168.1.81:4000',
      'https://react-monitoring-e49b2.web.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000, '0.0.0.0');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
