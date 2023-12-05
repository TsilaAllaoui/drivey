import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as child_process from 'child_process';
import { cp } from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SessionService {
  // Check if an user have a session
  async checkSession(uid: string) {
    try {
      const child = await child_process.spawnSync('sudo', [
        'ls',
        '/home/tsila/.config/gcsf',
      ]);
      const output = child.stderr.toString();
      console.log('Error: ' + child.stderr.toString());
      console.log('Output: ' + child.stdout.toString());
      const parts = child.stdout.toString().split('\n');
      for (let part of parts) {
        if (part == uid) {
          console.log(part);
          return true;
        }
      }
      return false;
    } catch (err) {
      throw new NotFoundException('Session with id: ' + uid + ' not found...');
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
  async createSession() {
    try {
      let output = ""
      const uid = uuidv4();
      console.log(uid)
      const child = await child_process.spawnSync('gcsf', ['login', uid]);
      console.log(child.stdout.toString());
      console.log('UUID: ' + uid);
      return uid;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Error creating new session...');
    }
  }
}
