import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { TIME_REG_EXP } from '../constants';

export type EventDocument = Event & Document;

export type EventType = 'view' | 'search' | 'upload';

@Schema()
export class Event {
  @ApiProperty()
  @Prop({ required: true })
  orgId: string;

  @ApiProperty()
  @Prop({ required: true })
  userId: string;

  @ApiProperty()
  @Prop({ required: true })
  videoId: string;

  @ApiProperty()
  @Prop({ required: true })
  eventType: EventType;

  @ApiProperty()
  @Prop({ required: true })
  time: Date;

  @ApiProperty({ required: false })
  @Prop({
    validate(obj: string) {
      if (!TIME_REG_EXP.test(obj)) {
        throw new Error('Wrong format');
      }
    },
  })
  watchedDuration?: string;

  @ApiProperty({ required: false })
  @Prop({
    validate(obj: string) {
      if (!TIME_REG_EXP.test(obj)) {
        throw new Error('Wrong format');
      }
    },
  })
  totalDuration?: string;

  @ApiProperty({ required: false })
  @Prop({
    validate(obj: string) {
      if (!TIME_REG_EXP.test(obj)) {
        throw new Error('Wrong format');
      }
    },
  })
  searchResponseTime?: string;

  @ApiProperty({ required: false })
  @Prop()
  searchedApp?: string;

  @ApiProperty({ required: false })
  @Prop()
  videoSize?: string;

  @ApiProperty({ required: false })
  @Prop()
  videoFormat?: string;

  @ApiProperty({ required: false })
  @Prop({
    validate(obj: string) {
      if (!TIME_REG_EXP.test(obj)) {
        throw new Error('Wrong format');
      }
    },
  })
  videoDuration?: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
