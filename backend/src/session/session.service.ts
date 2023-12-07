import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as child_process from 'child_process';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { AccessTokenJsonDto } from './dto/accessTokenJson.dto';

@Injectable()
export class SessionService {
  constructor(private configService: ConfigService) {}

  // Check if an user have a session
  async checkSession(uid: string) {
    const username = this.configService.get<string>('SERVER_USERNAME');
    try {
      fs.accessSync(`/home/${username}/.config/gcsf/${uid}`, fs.constants.F_OK);
      return true;
    } catch (err) {
      console.log('Session with id: ' + uid + ' not found...');
      return false;
    }
  }
  // Delete specific session
  async deleteSession(id: string) {
    try {
      const child = await child_process.spawnSync('gcsf', ['logout', id]);
      return child.stdout.toString();
    } catch (err) {
      throw new NotFoundException('Session with id: ' + id + ' not found...');
    }
  }

  // Create new session and mount current user drive
  async createSession(token: AccessTokenJsonDto) {
    try {
      console.log(token);
      const username = this.configService.get<string>('SERVER_USERNAME');
      let output = '';
      const uid = uuidv4();

      const json = JSON.stringify([
        {
          scopes: ['https://www.googleapis.com/auth/drive'],
          token: {
            access_token: token.access_token,
            refresh_token: token.refresh_token,
            id_token: null,
          },
        },
      ]);

      await fs.writeFileSync(`/home/${username}/.config/gcsf/${uid}`, json);

      return uid;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Error creating new session...');
    }
  }
}
