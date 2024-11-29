import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendPhishingDto {
  @ApiProperty({ example: 'anotherperson@mail.com' })
  @IsEmail({}, { message: 'Invalid recipient email format' })
  email: string;
}
