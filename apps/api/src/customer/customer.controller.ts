import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Lead } from '@prisma/client';
import { CustomerService, CustomerAuthResult, PublicCustomer } from './customer.service';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { CustomerJwtGuard } from './customer-jwt.guard';
import { AuthenticatedCustomer } from './customer-jwt.strategy';
import { Public } from '../common/decorators/public.decorator';

type CustomerReq = Request & { user: AuthenticatedCustomer };

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customer: CustomerService) {}

  @Public()
  @Post('register')
  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  @ApiOperation({ summary: 'Register a new customer account' })
  register(@Body() dto: RegisterCustomerDto): Promise<CustomerAuthResult> {
    return this.customer.register(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { ttl: 60_000, limit: 10 } })
  @ApiOperation({ summary: 'Customer login' })
  login(@Body() dto: LoginCustomerDto): Promise<CustomerAuthResult> {
    return this.customer.login(dto);
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
