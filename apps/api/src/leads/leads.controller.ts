import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Lead, Role } from '@prisma/client';
import { LeadsService, PaginatedLeads } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { QueryLeadsDto } from './dto/query-leads.dto';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('leads')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Public()
  @Post()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @ApiOperation({ summary: 'Submit a new lead (public)' })
  create(@Body() dto: CreateLeadDto): Promise<Lead> {
    return this.leadsService.create(dto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.SALES)
  @ApiOperation({ summary: 'List leads with filters and pagination' })
  findAll(@Query() query: QueryLeadsDto): Promise<PaginatedLeads> {
    return this.leadsService.findAll(query);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.SALES)
  @ApiOperation({ summary: 'Get a single lead by id' })
  findOne(@Param('id') id: string): Promise<Lead> {
    return this.leadsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Update lead status or assignment' })
  update(@Param('id') id: string, @Body() dto: UpdateLeadDto): Promise<Lead> {
    return this.leadsService.update(id, dto);
  }
}
