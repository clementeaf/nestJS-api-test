import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import * as dotenv from 'dotenv';

// Define the module type with optional hot module replacement
declare const module: NodeModule & {
  hot?: {
    accept(path?: string, callback?: () => void): void;
    dispose(callback: (data: any) => void): void;
  };
};

/**
 * Bootstrap the NestJS application.
 */
async function bootstrap() {
  // Load environment variables from .env file
  dotenv.config();

  // Create the NestJS application instance
  const app = await NestFactory.create(AppModule);

  // Use WebSocket adapter for the application
  app.useWebSocketAdapter(new WsAdapter(app));

  // Enable CORS with specific origins, methods, and credentials
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configure Swagger documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Github-monitoring API')
    .setDescription('API for monitoring repository activities on GitHub')
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, swaggerDocument);

  // Start the application on the specified port and host
  const PORT = process.env.PORT || 3000;
  const HOST = '0.0.0.0';
  await app.listen(PORT, HOST);

  // Hot module replacement setup
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

// Invoke the bootstrap function to start the application
bootstrap();
