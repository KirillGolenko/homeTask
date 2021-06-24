import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImportService } from './import.service';

@Controller('import')
export class ImportController {
  constructor(private importService: ImportService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  import(@UploadedFile() file) {
    return this.importService.import(file);
  }
}
