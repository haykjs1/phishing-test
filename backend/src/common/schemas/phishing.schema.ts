import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PhishingStatus } from 'src/modules/phishing/enums/phishing-status.enum';

export type T_PhishingDoc = Phishing & Document;

@Schema({
  timestamps: true,
})
export class Phishing extends Document {
  @Prop()
  email: string;

  @Prop({nullable: true})
  content: string;

  @Prop({ default: PhishingStatus.pending, enum: PhishingStatus })
  status: PhishingStatus;
}

export const PhishingSchema = SchemaFactory.createForClass(Phishing);
