import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

export interface CustomerJwtPayload {
  sub: string;
  email: string;
  type: 'customer';
}

export interface AuthenticatedCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

@Injectable()
export class CustomerJwtStrategy extends PassportStrategy(Strategy, 'customer-jwt') {
  constructor(
    config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET') ?? 'change-me-to-a-long-random-string',
    });
  }

  async validate(payload: CustomerJwtPayload): Promise<AuthenticatedCustomer> {
    if (payload.type !== 'customer') {
      throw new UnauthorizedException('Invalid token');
    }

    const customer = await this.prisma.customer.findUnique({
      where: { id: payload.sub },
    });

    if (!customer) {
      throw new UnauthorizedException('Account no longer exists');
    }

    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    };
  }
}
