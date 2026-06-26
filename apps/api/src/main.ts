import 'reflect-metadata';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

const WEAK_SECRET = 'change-me-to-a-long-random-string';

function assertSecureConfig(logger: Logger): void {
  const isProd = process.env.NODE_ENV === 'production';
  const secret = process.env.JWT_SECRET ?? '';
  if (isProd && (secret.length < 32 || secret === WEAK_SECRET)) {
    // Refuse to boot in production with a missing/weak/default JWT secret.
    throw new Error(
      'SECURITY: JWT_SECRET must be set to a strong, random value of at least 32 characters in production.',
    );
  }
  if (!isProd && (secret.length < 32 || secret === WEAK_SECRET)) {
    logger.warn('JWT_SECRET is weak/default — fine for local dev, NEVER for production.');
  }
}

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  assertSecureConfig(logger);

  const app = await NestFactory.create(AppModule, { bodyParser: false });

  // Security headers. Disable Helmet's CSP here (the API serves JSON + Swagger UI;
  // the browser-facing CSP lives in the Next.js app). Harden the rest.
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      frameguard: { action: 'deny' },
      hsts: { maxAge: 63072000, includeSubDomains: true, preload: true },
      referrerPolicy: { policy: 'no-referrer' },
    }),
  );

  // Cap request bodies to mitigate large-payload DoS.
  app.use(json({ limit: '100kb' }));
  app.use(urlencoded({ extended: true, limit: '100kb' }));

  // Trust the first proxy hop so rate limiting sees the real client IP.
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
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const prisma = app.get(PrismaService);
  prisma.enableShutdownHooks(app);

  // Swagger only in non-production to avoid exposing the API surface publicly.
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

  const port = Number(process.env.API_PORT ?? 4000);
  await app.listen(port);

  logger.log(`PESTOSOT API running on http://localhost:${port}`);
}

void bootstrap();
