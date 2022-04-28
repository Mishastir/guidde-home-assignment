import { ApiProperty } from '@nestjs/swagger';
import { WithOrganisationIdDto } from './with-organisation-id.dto';

export class UserWatchPercentageDto extends WithOrganisationIdDto {
  @ApiProperty({ default: 'anjk5671' })
  userId: string;
}
