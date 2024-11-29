import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { SendPhishingDto } from './dto/send-phishing.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PhishingDto } from './dto/output.phishing.dto';
import { SendPhishingResponseSuccessDto } from './dto/send-phishing-success.dto';

@ApiTags('Phishing')
@Controller('phishing')
export class PhishingController {
  constructor(private readonly phishingService: PhishingService) {}

  @Post('send')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async sendEmail(@Body() sendPhishingDto: SendPhishingDto) {
    try {
      await this.phishingService.sendPhishingEmail(sendPhishingDto.email);
      return new SendPhishingResponseSuccessDto('email successfully sent');
    } catch (error) {
      if (error?.response) {
        throw new BadRequestException(error?.response?.message);
      }
      if (error instanceof Error) {
        throw new BadRequestException('please send valid email');
      }
    }
  }

  @Get('click')
  async markClick(@Query('id') id: string) {
    return await this.phishingService.markAttemptAsClicked(id);
  }

  @Get('attempts')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getAllAttempts(): Promise<PhishingDto[]> {
    const data = await this.phishingService.getAllAttempts();
    return data.map((attempt) => new PhishingDto(attempt));
  }
}
