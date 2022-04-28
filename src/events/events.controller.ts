import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Event } from '../schemas';
import { UserWatchPercentageDto } from './dto/user-watch-percentage.dto';
import { VideosPerDayDto } from './dto/videos-per-day.dto';
import { WithOrganisationIdDto } from './dto/with-organisation-id.dto';
import { EventsService } from './events.service';

@Controller('events')
@ApiTags('Events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
  ) {
  }

  @Post()
  @ApiBody({ type: [Event] })
  saveEvents(@Body() body: Event[]) {
    return this.eventsService.saveNewEvents(body);
  }

  @Get('uploaded-videos')
  getUploadedVideos(@Query() query: WithOrganisationIdDto) {
    return this.eventsService.uploadedVideos(query.organisationId);
  }

  @Get('videos-per-day')
  getVideosPerDay(@Query() query: VideosPerDayDto) {
    return this.eventsService.getVideosPerDay(query.days, query.organisationId);
  }

  @Get('most-searched-app')
  getMostSearchedApp(@Query() query: WithOrganisationIdDto) {
    return this.eventsService.mostSearchedApplication(query.organisationId);
  }

  @Get('watch-percentage')
  getUserWatchPercentage(@Query() query: UserWatchPercentageDto) {
    return this.eventsService.getUserWatchPercentage(query.userId, query.organisationId);
  }
}
