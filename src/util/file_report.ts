import { reportLogger } from '@src/util/file_logger.js';
import { logger } from '@src/util/logger.js';
import { getLongerName } from '@src/util/longer_name.js';
import fs from 'node:fs';
import path from 'node:path';

const fileReport = (files: string[]): void => {
  const longerName = getLongerName(files);
  logger.blank();
  logger.blank();
  files.forEach((file) => {
    const absolutePath = path.isAbsolute(file)
      ? file
      : path.join(process.cwd(), file);
    if (fs.existsSync(absolutePath)) {
      const buffer = fs.readFileSync(absolutePath);
      const fileObject = new File([buffer], path.basename(file));
      reportLogger.file(fileObject, longerName);
    }
  });
  logger.blank();
};

export { fileReport };