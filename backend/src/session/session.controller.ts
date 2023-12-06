import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SessionService } from './session.service';
import { ConfigService } from '@nestjs/config';

@ApiTags('🔗 Session')
@Controller('/api/session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  // Check if user already have a session
  @Post('/:uid')
  @ApiOperation({
    summary: 'Check if user already have a session',
  })
  async checkSession(@Param('uid') uid: string) {
    return await this.sessionService.checkSession(uid);
  }

  // Create session for current user
  @Get('login')
  @ApiOperation({
    summary: 'Create Session for current user',
  })
  async createSession() {
    return await this.sessionService.createSession();
  }

  // Delete user session
  @Delete('logout/:id')
  @ApiOperation({
    summary: 'Delete specific session',
  })
  async deleteSession(@Param('id') id: string) {
    return await this.sessionService.deleteSession(id);
  }
}
