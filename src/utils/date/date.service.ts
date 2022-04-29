import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Injectable()
export class DateService {
  // We also may add custom format function as 3 param
  getDatesArray(from: dayjs.Dayjs, to: dayjs.Dayjs) {
    const datesArray = [];

    for (let currentDay = from.clone(); currentDay.isBefore(to); currentDay = currentDay.add(1, 'day')) {
      datesArray.push(currentDay.format('YYYY-MM-DD'));
    }

    return datesArray;
  }
}
