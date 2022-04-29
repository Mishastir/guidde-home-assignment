import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bytes from 'bytes';
import * as dayjs from 'dayjs';
import { Model } from 'mongoose';
import { ONE_DAY } from '../constants';
import { Event, EventDocument } from '../schemas';
import { DateService } from '../utils/date/date.service';
import { TimeService } from '../utils/time/time.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name)
    private readonly eventModel: Model<EventDocument>,
    private readonly timeService: TimeService,
    private readonly dateService: DateService,
  ) {
  }

  saveNewEvents(events: Event[]) {
    return this.eventModel.insertMany(events);
  }

  async uploadedVideos(organisationId: string) {
    const sevenDaysFromNowMs = dayjs()
      .subtract(7, 'day')
      .unix() * 1000;

    const data = await this.eventModel.find({
      eventType: 'upload',
      time: {
        $gte: new Date(sevenDaysFromNowMs),
      },
      orgId: organisationId,
    });

    if (!data || !data.length) {
      return ({
        count: 0,
        averageVideoSize: 0,
      });
    }

    const averageFileSize = data.reduce((acc, curr) => {
      const fileSizeInBytes = bytes(curr.videoSize);

      return acc + fileSizeInBytes;
    }, 0);

    const videosCount = data.length;

    return ({
      count: videosCount,
      averageVideoSize: bytes.format(averageFileSize / videosCount),
    });
  }

  async mostSearchedApplication(organisationId: string) {
    const oneDayMs = ONE_DAY * 1000;

    const data = await this.eventModel.aggregate([
      {
        $match: {
          eventType: 'search',
          time: {
            $gte: new Date(Date.now() - oneDayMs),
          },
          orgId: organisationId,
        },
      },
      {
        $sortByCount: '$searchedApp',
      },
      {
        $limit: 1,
      },
    ]);

    if (!data[0]) {
      return ({
        count: 0,
        application: null,
      });
    }

    return ({
      count: data[0].count,
      application: data[0]._id,
    });
  }

  async getUserWatchPercentage(userId: string, organisationId: string) {
    const data = await this.eventModel.find({
      userId,
      eventType: 'view',
      orgId: organisationId,
    });

    if (!data.length) {
      return 0;
    }

    const sumOfPercentages = data.reduce((acc, curr) => {
      const watchedInMs = this.timeService.parse(curr.watchedDuration);
      const durationInMs = this.timeService.parse(curr.totalDuration);

      return acc + parseFloat(((watchedInMs / durationInMs) * 100).toFixed(3));
    }, 0);

    return sumOfPercentages / data.length;
  }

  async getVideosPerDay(days: number, organisationId: string) {
    const dayFrom = dayjs().subtract(days, 'day');
    const datesArray = this.dateService.getDatesArray(dayFrom, dayjs());
    const dayFromMs = dayFrom.unix() * 1000;

    const data = await this.eventModel.aggregate([
      {
        $match: {
          time: {
            $gte: new Date(dayFromMs),
          },
          orgId: organisationId,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$time' },
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // As far as search in object by key is much faster than Array.includes, let`s change found array to {[date]: count}
    const transformedData = data.reduce((acc, curr) => {
      acc[curr._id] = curr.count;

      return acc;
    }, {});

    return datesArray.map((date) => {
      return transformedData[date] || 0;
    });
  }
}
