import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterCustomerDto {
  @ApiProperty({ example: 'Ananya Rao' })
  @IsString()
  @Length(2, 80)
  name!: string;

  @ApiProperty({ example: 'ananya@example.com' })
  @IsEmail()
  @MaxLength(160)
  email!: string;

  @ApiProperty({ example: '+919812345678' })
  @IsString()
  @Length(10, 16)
  @Matches(/^[+0-9\s-]+$/, { message: 'phone may only contain digits, +, spaces and dashes' })
  phone!: string;

  @ApiProperty({ example: 'Secret@123', minLength: 8 })
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password!: string;
}
