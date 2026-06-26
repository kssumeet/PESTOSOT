import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/** Guards customer-only routes. Used together with @Public() so the global
 * staff JwtAuthGuard is bypassed and this customer strategy runs instead. */
@Injectable()
export class CustomerJwtGuard extends AuthGuard('customer-jwt') {}
