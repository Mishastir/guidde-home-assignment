import { Module } from '@nestjs/common';
import { DateService } from './date/date.service';
import { TimeService } from './time/time.service';

@Module({
  providers: [
    TimeService,
    DateService,
  ],
  exports: [
    TimeService,
    DateService,
  ],
})
export class UtilsModule {
}
