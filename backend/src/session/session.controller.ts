import { Controller, Post, Delete, Param, Get, Body } from '@nestjs/common';
import { SessionService } from './session.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('🔗 Session')
@Controller('/api/session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('/:uid')
  @ApiOperation({
    summary: 'Check if user already have a session',
  })
  async checkSession(@Param('uid') uid: string) {
    return await this.sessionService.checkSession(uid);
  }

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
