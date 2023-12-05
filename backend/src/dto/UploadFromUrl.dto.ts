import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UploadFromUrlDto {
  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsString()
  uid: string;
}
