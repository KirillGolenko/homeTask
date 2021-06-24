import { Injectable } from '@nestjs/common';
import * as csv from 'csvtojson/v2';
import * as fs from 'fs';

@Injectable()
export class ImportService {
  async import(file: { path: string }) {
    const readStream = fs.createReadStream(file.path);
    const data = [];
    const result = await csv()
      .fromStream(readStream)
      .subscribe((line) => {
        const regExp = /^[\w.+\-]+@yahoo\.com$/;
        const params = regExp.exec(line.email);
        if (params) {
          data.push(line);
        }
      })
      .on('done', () => {
        fs.unlinkSync(file.path);
      })
      .on('error', (err) => {
        console.log(err);
      });

    return { data: data };
  }
}
