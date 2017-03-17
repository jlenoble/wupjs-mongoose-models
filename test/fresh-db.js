import mongoose from 'mongoose';
import cleanupWrapper from 'cleanup-wrapper';
import {spawn} from 'child_process';
import childProcessData from 'child-process-data';
import {getPort} from './port';

export default function freshDb (func) {
  let port = getPort();

  return cleanupWrapper(func, {
    port,

    before: function () {
      console.log(`Creating new MongoDB container mongo-wup-${this.port}:`);

      return childProcessData(spawn('docker', [
        'run', '--rm', '--name', `mongo-wup-${this.port}`, '-p',
        `${this.port}:27017`, '-d', 'jlenoble/mongo-wup',
      ])).then(() => new Promise((resolve, reject) => {
        const wait = () => {
          resolve(mongoose.connect(`mongodb://localhost:${this.port}/wup`));
        };
        setTimeout(wait, 2500);
      }));
    },

    after: function () {
      console.log('Destroying MongoDB container:');

      return mongoose.disconnect()
        .then(() => childProcessData(spawn('docker', ['stop',
          `mongo-wup-${this.port}`])));
    },
  });
};
