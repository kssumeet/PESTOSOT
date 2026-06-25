import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Lead, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { QueryLeadsDto } from './dto/query-leads.dto';

export interface PaginatedLeads {
  data: Lead[];
  total: number;
  page: number;
  limit: number;
}

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
  ) {}

  async create(dto: CreateLeadDto): Promise<Lead> {
    const lead = await this.prisma.lead.create({
      data: {
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        serviceType: dto.serviceType,
        propertyType: dto.propertyType,
        city: dto.city ?? 'Bangalore',
        locality: dto.locality,
        preferredDate: dto.preferredDate ? new Date(dto.preferredDate) : null,
        preferredTime: dto.preferredTime,
        message: dto.message,
        source: dto.source ?? 'website',
      },
    });

    try {
      await this.mail.notifyNewLead(lead);
    } catch (error) {
      this.logger.error(
        `Failed to send lead notification for ${lead.id}`,
        error instanceof Error ? error.stack : String(error),
      );
    }

    return lead;
  }

  async findAll(query: QueryLeadsDto): Promise<PaginatedLeads> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const where: Prisma.LeadWhereInput = {};
    if (query.status) {
      where.status = query.status;
    }
    if (query.city) {
      where.city = { equals: query.city, mode: 'insensitive' };
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.lead.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<Lead> {
    const lead = await this.prisma.lead.findUnique({ where: { id } });
    if (!lead) {
      throw new NotFoundException(`Lead ${id} not found`);
    }
    return lead;
  }

  async update(id: string, dto: UpdateLeadDto): Promise<Lead> {
    await this.findOne(id);

    if (dto.assignedToId) {
      const assignee = await this.prisma.user.findUnique({
        where: { id: dto.assignedToId },
      });
      if (!assignee) {
        throw new NotFoundException(`Assignee ${dto.assignedToId} not found`);
      }
    }

    return this.prisma.lead.update({
      where: { id },
      data: {
        status: dto.status,
        assignedToId: dto.assignedToId,
      },
    });
  }
}
