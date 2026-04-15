/* eslint-disable ts/no-unnecessary-condition */
import { fileStyle } from '@src/constant/file_style.js';
import {
  icon,
  colorAnsi,
  LogManager
} from 'logginlys';

import type { LoggerStyleParameters } from 'logginlys';

class FileLogger extends LogManager {
  file (file: File, largeFileName: string) {
    const fileSize = `${(file.size / 1024).toFixed(2)} Kb`;
    const fileExtension = file.name.split('.').pop() ?? '';
    const space = ' '.repeat(largeFileName.length - file.name.length + 10);
    const style = fileStyle[fileExtension as keyof typeof fileStyle] ?? fileStyle.default;
    const logStyle: LoggerStyleParameters = {
      ansi: { color: style.color },
      showBadge: false
    };

    const iconMessage = `${colorAnsi.green}${icon.check} ${style.color}${style.icon}${colorAnsi.reset}`;
    const message = `${colorAnsi.white}${file.name}${colorAnsi.reset}`;
    const messageWithIcon = `${iconMessage} ${message} ${space} (${fileSize})`;

    this.custom(messageWithIcon, { ...logStyle });
  }
}

const fileLogger = new FileLogger();

export { fileLogger };