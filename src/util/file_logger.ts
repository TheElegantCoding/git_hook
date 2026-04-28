/* eslint-disable ts/no-unnecessary-condition */
import { commitType } from '@src/constant/commit_constant.js';
import { fileStyle } from '@src/constant/file_style.js';
import {
  colorAnsi,
  loggerIcon,
  LogManager,
  loggerStyle
} from 'logginlys';

import type { CommitType } from '@src/type/commit_type.js';
import type { LoggerStyleParameters } from 'logginlys';

class ReportLogger extends LogManager {
  commit (commit: CommitType) {
    const commitIcon = loggerStyle.ansi('\uf172', { color: colorAnsi.blue });
    const message = loggerStyle.ansi(commit.cleanMessage ?? '', { color: colorAnsi.white });
    const hash = loggerStyle.ansi(`[${commit.hash}]`, { color: colorAnsi.gray });
    const type = loggerStyle.ansi(commit.type ?? '', { color: commitType[commit.type as keyof typeof commitType]?.color ?? colorAnsi.white });
    const messageWithIcon = `${commitIcon}  ${hash} ${type}: ${message}`;

    const logStyle: LoggerStyleParameters = {
      showBadge: false,
      showTimestamp: false
    };

    this.debug(messageWithIcon, logStyle);
  }

  file (file: File, largeFileName: string) {
    const fileSize = `${(file.size / 1024).toFixed(2)} Kb`;
    const fileExtension = file.name.split('.').pop() ?? '';
    const space = ' '.repeat(largeFileName.length - file.name.length + 10);
    const style = fileStyle[fileExtension as keyof typeof fileStyle] ?? fileStyle.default;
    const logStyle: LoggerStyleParameters = {
      ansi: { color: style.color },
      showBadge: false
    };

    const check = loggerStyle.ansi(loggerIcon.check, { color: colorAnsi.green });
    const fileIcon = loggerStyle.ansi(style.icon, { color: style.color });
    const message = loggerStyle.ansi(file.name, { color: colorAnsi.white });
    const messageWithIcon = `${check} ${fileIcon} ${message} ${space} (${fileSize})`;

    this.debug(messageWithIcon, { ...logStyle });
  }
}

const reportLogger = new ReportLogger();

export { reportLogger };