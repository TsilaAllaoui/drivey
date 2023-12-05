import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as child_process from 'child_process';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SessionService {
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
  async createSession() {
    try {
      const uid = uuidv4();
      const child = child_process.spawn('gcsf', ['login', uid]);

      let output = '';
      child.stdout.setEncoding('utf8');
      child.stdout.on('data', function (data) {
        console.log(data);
        output += data.toString();
      });
      child.stderr.setEncoding('utf8');
      child.stderr.on('data', function (data) {
        console.log(data);
        output += data.toString();
      });
      child.on('close', (code) => {
        console.log('Command returned code ' + code + ' on exit');
        console.log(output);
        return output;
      });
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Error creating new session...');
    }
  }
}
