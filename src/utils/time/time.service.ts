import { Injectable } from '@nestjs/common';
import { TIME_REG_EXP } from '../../constants';

@Injectable()
export class TimeService {
  validate(time: string): boolean {
    return new RegExp(TIME_REG_EXP).test(time);
  }

  parse(time: string) {
    if (!this.validate(time)) {
      throw new Error('Time format is invalid. Must be: "HH:mm:ss.SSS"');
    }

    const [hours, minutes, secondsWithMs] = time.split(':');
    const [seconds, milliseconds] = secondsWithMs.split('.');

    return (((Number(hours) * 60) + Number(minutes)) * 60 + Number(seconds)) * 1000 + Number(milliseconds);
  }
}
