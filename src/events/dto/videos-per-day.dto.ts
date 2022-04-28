import { ApiProperty } from '@nestjs/swagger';
import { WithOrganisationIdDto } from './with-organisation-id.dto';

export class VideosPerDayDto extends WithOrganisationIdDto {
  @ApiProperty({ default: 2 })
  days: number;
}
