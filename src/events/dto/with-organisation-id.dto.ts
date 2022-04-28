import { ApiProperty } from '@nestjs/swagger';

export class WithOrganisationIdDto {
  @ApiProperty({ default: 'djvnm87d ' })
  organisationId: string;
}
