import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Customer, Lead } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { CustomerJwtPayload } from './customer-jwt.strategy';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';

export interface PublicCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface CustomerAuthResult {
  accessToken: string;
  customer: PublicCustomer;
}

@Injectable()
export class CustomerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  private toPublic(c: Customer): PublicCustomer {
    return { id: c.id, name: c.name, email: c.email, phone: c.phone };
  }

  private async sign(customer: Customer): Promise<CustomerAuthResult> {
    const payload: CustomerJwtPayload = {
      sub: customer.id,
      email: customer.email,
      type: 'customer',
    };
    const accessToken = await this.jwt.signAsync(payload);
    return { accessToken, customer: this.toPublic(customer) };
  }

  async register(dto: RegisterCustomerDto): Promise<CustomerAuthResult> {
    const email = dto.email.toLowerCase().trim();
    const existing = await this.prisma.customer.findUnique({ where: { email } });
    if (existing) {
      throw new ConflictException('An account with this email already exists');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const customer = await this.prisma.customer.create({
      data: { name: dto.name.trim(), email, phone: dto.phone.trim(), passwordHash },
    });

    // Link prior anonymous enquiries by EMAIL only (the account identity).
    // Phone is intentionally NOT used for linking — it is unverified and not
    // unique, which would let one account claim another person's enquiries.
    await this.prisma.lead.updateMany({
      where: { customerId: null, email },
      data: { customerId: customer.id },
    });

    return this.sign(customer);
  }

  async login(dto: LoginCustomerDto): Promise<CustomerAuthResult> {
    const email = dto.email.toLowerCase().trim();
    const customer = await this.prisma.customer.findUnique({ where: { email } });
    if (!customer) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const ok = await bcrypt.compare(dto.password, customer.passwordHash);
    if (!ok) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.sign(customer);
  }

  /** A customer's bookings — records linked to them or matching their account email.
   * Phone is deliberately excluded to prevent cross-account data exposure. */
  async getLeads(customer: PublicCustomer): Promise<Lead[]> {
    return this.prisma.lead.findMany({
      where: {
        OR: [{ customerId: customer.id }, { email: customer.email }],
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
