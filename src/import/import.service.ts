import { Injectable } from '@nestjs/common';
import * as csv from 'csvtojson/v2';

@Injectable()
export class ImportService {
  async import(file: { path: string }) {
    const result = await csv().fromFile(file.path);
    const filterFile = result.filter((contact) => {
      const regExp = /^[\w.+\-]+@yahoo\.com$/;
      const params = regExp.exec(contact.email);
      if (params) return contact;
    });
    return { data: filterFile };
  }
}
