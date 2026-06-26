import { Controller, Get } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('health')
@Controller('health')
export class HealthController {
  // Exempt from rate limiting so platform health checks (Railway/Vercel) never 429.
  @Public()
  @SkipThrottle()
  @Get()
  @ApiOperation({ summary: 'Liveness check' })
  check(): { status: string } {
    return { status: 'ok' };
  }
}
