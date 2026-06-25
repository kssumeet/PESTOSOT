import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsISO8601,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateLeadDto {
  @ApiProperty({ example: 'Ravi Kumar', minLength: 2, maxLength: 80 })
  @IsString()
  @Length(2, 80)
  name!: string;

  @ApiProperty({ example: '+919876543210', description: 'Indian-ish phone, +91 or 10-digit' })
  @IsString()
  @Length(10, 15)
  phone!: string;

  @ApiPropertyOptional({ example: 'ravi@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: 'pest-control',
    description:
      'e.g. pest-control | deep-cleaning | termite-control | cockroach-control | rodent-control | bed-bug-control | mosquito-control | sofa-cleaning | kitchen-cleaning | amc | other',
  })
  @IsString()
  @Length(2, 60)
  serviceType!: string;

  @ApiProperty({
    example: 'residential',
    description: 'residential | commercial | industrial',
  })
  @IsString()
  @Length(2, 40)
  propertyType!: string;

  @ApiProperty({ example: 'Bangalore', default: 'Bangalore' })
  @IsString()
  @Length(2, 80)
  city!: string;

  @ApiPropertyOptional({ example: 'Whitefield' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  locality?: string;

  @ApiPropertyOptional({ example: '2026-07-01', description: 'ISO date' })
  @IsOptional()
  @IsISO8601()
  preferredDate?: string;

  @ApiPropertyOptional({ example: 'morning', description: 'morning | afternoon | evening' })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  preferredTime?: string;

  @ApiPropertyOptional({ example: 'Please call after 6pm.', maxLength: 1000 })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  message?: string;

  @ApiPropertyOptional({ example: 'website-homepage', default: 'website' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  source?: string;
}
