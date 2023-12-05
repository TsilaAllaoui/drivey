import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { UploadFromUrlDto } from './dto/UploadFromUrl.dto';

@ApiTags('URL Upload')
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @ApiResponse({
    status: 200,
    description: 'File from URL uploaded successfully...',
  })
  @ApiResponse({
    status: 500,
    description: 'Failed to upload file from URL...',
  })
  @ApiOperation({
    summary: 'Upload File from URL',
  })
  uploadFileFromURL(@Body() body: UploadFromUrlDto) {
    return this.appService.uploadFileFromURL(body.url);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Create Session for current user',
  })
  async createSession() {
    return await this.appService.createSession();
  }
}
