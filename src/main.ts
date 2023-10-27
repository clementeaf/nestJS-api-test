import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));

  const config = new DocumentBuilder()
    .setTitle('Github-monitoring API')
    .setDescription(
      'API para el monitoreo de actividades de repositorio en GitHub',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
