import { BadRequestException, Injectable } from '@nestjs/common';
import * as child_process from 'child_process';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
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
      return new BadRequestException('Error creating new session...');
    }
  }

  // Upload file from specidied URL
  uploadFileFromURL(url: string) {
    try {
      let output = '';
      // const child = child_process.spawn('sudo', ['gcsf', 'login', uuid]);

      // child.stdout.setEncoding('utf8');
      // child.stdout.on('data', function (data) {
      //   console.log(data);
      //   output += data.toString();
      // });
      // child.stderr.setEncoding('utf8');
      // child.stderr.on('data', function (data) {
      //   console.log(data);
      //   output += data.toString();
      // });
      // child.on('close', (code) => {
      //   console.log('Command returned code ' + code + ' on exit');
      // });

      return output;
    } catch (err) {
      console.log(err);
      return new BadRequestException(
        "Error uploading file from URL\nVerify URL or if you're a dev, verify the command output",
      );
    }
  }
}
