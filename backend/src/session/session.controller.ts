import { Controller, Post, Delete, Param } from '@nestjs/common';
import { SessionService } from './session.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('🔗 Session')
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Create Session for current user',
  })
  async createSession() {
    return await this.sessionService.createSession();
  }

  @Delete('logout/:id')
  @ApiOperation({
    summary: 'Delete specific session',
  })
  async deleteSession(@Param('id') id: string) {
    return await this.sessionService.deleteSession(id);
  }
}
