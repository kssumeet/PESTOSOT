import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { createNestApp } from './app.factory';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap(): Promise<void> {
  const { app } = await createNestApp();

  const prisma = app.get(PrismaService);
  prisma.enableShutdownHooks(app);

  const port = Number(process.env.API_PORT ?? 4000);
  await app.listen(port);

  new Logger('Bootstrap').log(`PESTOSOT API running on http://localhost:${port}`);
}

void bootstrap();
