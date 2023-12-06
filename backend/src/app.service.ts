import { BadRequestException, Injectable } from '@nestjs/common';
import * as child_process from 'child_process';
import { WebsocketGateway } from './websocket/websocket.gateway';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

export type WgetInfo = {
  file: string;
  size: string;
  progress: string;
  speed: string;
  eta: string;
};

@Injectable()
export class AppService {
  constructor(
    private readonly websocketGateway: WebsocketGateway,
    private configService: ConfigService,
  ) {}

  // Upload file from specidied URL
  async uploadFileFromURL(url: string, uid: string) {
    const username = this.configService.get<string>('SERVER_USERNAME');

    try {
      let output = '';
      console.log(`Uploading file at url: "${url}"...`);
      let wgetInfo: WgetInfo = {
        file: '',
        size: '',
        progress: '',
        speed: '',
        eta: '',
      };

      // Unmounting uid folder for safety
      let unmount_process = await child_process.spawnSync('sudo', [
        'umount',
        `/home/${username}/${uid}`,
      ]);

      // Deleting and recreating uid folder for safety
      if (fs.existsSync(`/home/${username}/${uid}`)) {
        await fs.rmdirSync(`/home/${username}/${uid}`, {
          recursive: true,
        });
      }
      await fs.mkdirSync(`/home/${username}/${uid}`);

      // Mounting Gdrive uid folder
      let child = child_process.spawn('gcsf', [
        'mount',
        `/home/${username}/${uid}`,
        '-s',
        uid,
      ]);

      child.on('close', (code) => {
        if (code == 0) {
          console.log(`Gdrive mounted successfully...`);
        } else {
          console.log(`Error mounting Gdrive...`);
        }
      });

      child.stdout.setEncoding('utf8');
      child.stdout.on('data', (data) => {
        console.log(data);
        output += data.toString();
      });

      child.stderr.setEncoding('utf8');
      child.stderr.on('data', (data) => {
        console.log(data);
        output += data.toString();

        // Running wget and uploading file
        if (output.includes('Mounted to')) {
          console.log('Starting upload....');
          let uploadChild = child_process.spawn('wget', [
            '-P',
            `/home/${username}/${uid}`,
            url,
          ]);

          let length = '';
          uploadChild.stderr.setEncoding('utf8');
          uploadChild.stderr.on('data', (data) => {
            const log = data.toString();

            if (log.includes('Saving to:')) {
              const tmp = log.slice(
                log.indexOf('‘', 'Saving to:') + 1,
                log.indexOf('’', 'Saving to:'),
              );
              const parts = tmp.split('/');
              wgetInfo.file = parts[parts.length - 1];
            }

            if (log.includes('Length:')) {
              wgetInfo.size = log.slice(
                log.indexOf('(', 'Length:') + 1,
                log.indexOf(')', 'Length:'),
              );
            }

            if (log.includes('%')) {
              const percentagePos = log.indexOf('%');
              const speedPos = log.indexOf(' ', percentagePos + 2);
              const etaPos = log.indexOf(' ', speedPos + 2);

              let left = percentagePos;
              while (log[left] !== ' ') {
                left--;
              }

              // Check if there was progress
              const sameProgress =
                wgetInfo.speed == log.slice(left + 1, percentagePos + 1);

              if (!sameProgress) {
                // Progress
                wgetInfo.progress = log.slice(left + 1, percentagePos + 1);

                // Speed
                let tmp = log.slice(percentagePos + 2, speedPos);
                if (tmp != '' && wgetInfo.progress != '100%') {
                  wgetInfo.speed = tmp + '/s';
                }

                // Eta
                tmp = log.slice(speedPos + 1, etaPos);
                if (!tmp.includes('.') && !tmp.includes('K')) {
                  if (!tmp.includes('s')) {
                    wgetInfo.eta = tmp.replace('\n', '') + 's';
                  } else wgetInfo.eta = tmp.replace('\n', '');
                }
              }

              console.log(wgetInfo);

              this.websocketGateway.server.emit('percentage', wgetInfo);
              if (wgetInfo.progress == '99%' || wgetInfo.progress == '100%') {
                this.websocketGateway.server.emit('finished', true);
              }
            }

            output += data.toString();
          });

          uploadChild.on('close', (code) => {
            if (code == 0) {
              console.log(`File ${wgetInfo.file} uploaded successfully...`);
              return `File at ${wgetInfo.file} uploaded successfully...`;
            } else {
              console.log(`Error while uploading file at ${url}...`);
              return `Error while uploading file at ${url}...`;
            }
          });

          return uploadChild.stdout.toString();
        }
      });
    } catch (err) {
      console.log(err);
      throw new BadRequestException(
        "Error uploading file from URL\nVerify URL or if you're a dev, verify the command output...",
      );
    }
  }
}
