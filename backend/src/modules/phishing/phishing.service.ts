import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Phishing, T_PhishingDoc } from '../../common/schemas/phishing.schema';
import * as process from 'node:process';
import { MailService } from '../mail/mail.service';
import { PhishingStatus } from './enums/phishing-status.enum';

@Injectable()
export class PhishingService {
  constructor(
    @InjectModel(Phishing.name)
    private readonly phishingModel: Model<T_PhishingDoc>,
    private readonly emailService: MailService,
  ) {}

  async sendPhishingEmail(email: string) {
    const existingPhishingAttempt = await this.phishingModel
      .findOne({ email })
      .exec();
    if (existingPhishingAttempt) {
      throw new BadRequestException('Phishing email already sent');
    }

  
    const newPhishingAttempt = new this.phishingModel({
      email,
      status: PhishingStatus.pending,
    });
    await newPhishingAttempt.save();

    const url = `${process.env.APP_URL}/phishing/click?id=${newPhishingAttempt._id}`;
    const content = `<h1>This is a simulated phishing attempt. Click <a href="${url}">here</a> to check the result.</h1>`;
    newPhishingAttempt.content = content;
    try {
      await this.emailService.sendPhishingEmail(email, content);
    }
    catch (error) {
      newPhishingAttempt.status = PhishingStatus.failed;
    }
    await newPhishingAttempt.save();
  }

  async markAttemptAsClicked(id: string) {
    const attempt = await this.phishingModel.findOne({
      _id:id,
      status: PhishingStatus.pending,
    });
    if (!attempt) {
      throw new BadRequestException('No pending phishing attempt found');
    }
    attempt.status = PhishingStatus.clicked;
    await attempt.save();
  }

  async getAllAttempts(): Promise<Phishing[]> {
    return this.phishingModel.find();
  }
}
