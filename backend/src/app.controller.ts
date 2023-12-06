import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { UploadFromUrlDto } from './dto/UploadFromUrl.dto';

@ApiTags('🌏 URL Upload')
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @ApiOperation({
    summary: 'Upload File from URL',
  })
  uploadFileFromURL(@Body() body: UploadFromUrlDto) {
    return this.appService.uploadFileFromURL(body.url, body.uid);
  }
}
