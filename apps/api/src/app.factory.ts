import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import express, { json, urlencoded, type Express } from 'express';
import { AppModule } from './app.module';

const WEAK_SECRET = 'change-me-to-a-long-random-string';

export function assertSecureConfig(logger: Logger): void {
  const isProd = process.env.NODE_ENV === 'production';
  const secret = process.env.JWT_SECRET ?? '';
  if (isProd && (secret.length < 32 || secret === WEAK_SECRET)) {
    throw new Error(
      'SECURITY: JWT_SECRET must be a strong, random value of at least 32 characters in production.',
    );
  }
  if (!isProd && (secret.length < 32 || secret === WEAK_SECRET)) {
    logger.warn('JWT_SECRET is weak/default — fine for local dev, NEVER for production.');
  }
}

/**
 * Build and configure the Nest application on top of a provided/created Express
 * instance — without calling listen(). Shared by the long-running server
 * (main.ts) and the Vercel serverless handler (api/index.ts).
 */
export async function createNestApp(): Promise<{
  app: INestApplication;
  expressApp: Express;
}> {
  const logger = new Logger('Bootstrap');
  assertSecureConfig(logger);

  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp), {
    bodyParser: false,
  });

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      frameguard: { action: 'deny' },
      hsts: { maxAge: 63072000, includeSubDomains: true, preload: true },
      referrerPolicy: { policy: 'no-referrer' },
    }),
  );
  app.use(json({ limit: '100kb' }));
  app.use(urlencoded({ extended: true, limit: '100kb' }));
  app.getHttpAdapter().getInstance().set('trust proxy', 1);

  const webOrigin = process.env.WEB_ORIGIN ?? 'http://localhost:3000';
  app.enableCors({
    origin: webOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_SWAGGER === 'true') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('PESTOSOT API')
      .setDescription('Premium pest-control / deep-cleaning lead-gen platform API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document);
  }

  return { app, expressApp };
}
