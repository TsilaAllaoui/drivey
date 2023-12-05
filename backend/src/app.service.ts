import { BadRequestException, Injectable } from '@nestjs/common';
import * as child_process from 'child_process';
import { WebsocketGateway } from './websocket/websocket.gateway';

@Injectable()
export class AppService {
  constructor(private readonly websocketGateway: WebsocketGateway) {}

  // Upload file from specidied URL
  async uploadFileFromURL(url: string, uid: string) {
    this.websocketGateway.server.emit('test', 'TEST');
    return '';
    try {
      // Mounting drive
      let output = '';
      console.log(`Uploading file at url: "${url}"`);
      console.log('UUID: ' + uid);
      await child_process.spawnSync('sudo', ['umount', '/home/tsila/gdrive']);
      let child = child_process.spawn('gcsf', [
        'mount',
        '/home/tsila/gdrive/',
        '-s',
        uid,
      ]);

      child.stdout.setEncoding('utf8');
      child.stdout.on('data', (data) => {
        console.log(data);
        output += data.toString();
      });

      child.stderr.setEncoding('utf8');
      child.stderr.on('data', (data) => {
        console.log(data);
        output += data.toString();
        if (output.includes('Mounted to')) {
          console.log('Uploading....');
          let uploadChild = child_process.spawn('wget', [
            '-P',
            '/home/tsila/gdrive',
            url,
          ]);

          uploadChild.stderr.setEncoding('utf8');
          uploadChild.stderr.on('data', (data) => {
            const log = data.toString();
            if (log.includes('%')) {
              const pos = log.indexOf('%');
              let left = pos;
              while (log[left] !== ' ') {
                left--;
              }
              let percentage = log.slice(left + 1, pos + 1);
              console.log(percentage);
              // Use an arrow function to preserve the context
              this.websocketGateway.server.emit('percentage', percentage);
            }

            output += data.toString();
          });

          uploadChild.on('close', (code) => {
            console.log('Command returned code ' + code + ' on exit');
          });

          return uploadChild.stdout.toString();
        }
      });

      child.on('close', (code) => {
        console.log('Command returned code ' + code + ' on exit');
        return child.stdout.toString();
      });
    } catch (err) {
      console.log(err);
      throw new BadRequestException(
        "Error uploading file from URL\nVerify URL or if you're a dev, verify the command output...",
      );
    }
  }
}
