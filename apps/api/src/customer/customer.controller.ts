import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Lead } from '@prisma/client';
import { CustomerService, CustomerAuthResult, PublicCustomer } from './customer.service';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { CustomerJwtGuard } from './customer-jwt.guard';
import { AuthenticatedCustomer } from './customer-jwt.strategy';
import { Public } from '../common/decorators/public.decorator';
import { CUSTOMER_COOKIE, authCookieOptions } from '../common/cookie';

type CustomerReq = Request & { user: AuthenticatedCustomer };

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customer: CustomerService) {}

  @Public()
  @Post('register')
  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  @ApiOperation({ summary: 'Register a new customer account; sets a session cookie' })
  async register(
    @Body() dto: RegisterCustomerDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<CustomerAuthResult> {
    const result = await this.customer.register(dto);
    res.cookie(CUSTOMER_COOKIE, result.accessToken, authCookieOptions());
    return result;
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { ttl: 60_000, limit: 10 } })
  @ApiOperation({ summary: 'Customer login; sets a session cookie' })
  async login(
    @Body() dto: LoginCustomerDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<CustomerAuthResult> {
    const result = await this.customer.login(dto);
    res.cookie(CUSTOMER_COOKIE, result.accessToken, authCookieOptions());
    return result;
  }

  @Public()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Clear the customer session cookie' })
  logout(@Res({ passthrough: true }) res: Response): { ok: true } {
    res.clearCookie(CUSTOMER_COOKIE, { ...authCookieOptions(), maxAge: undefined });
    return { ok: true };
  }

  // @Public() bypasses the global staff JwtAuthGuard; CustomerJwtGuard enforces customer auth.
  @Public()
  @UseGuards(CustomerJwtGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the authenticated customer' })
  me(@Req() req: CustomerReq): PublicCustomer {
    const { id, name, email, phone } = req.user;
    return { id, name, email, phone };
  }

  @Public()
  @UseGuards(CustomerJwtGuard)
  @Get('leads')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get the authenticated customer's bookings" })
  leads(@Req() req: CustomerReq): Promise<Lead[]> {
    return this.customer.getLeads(req.user);
  }
}
