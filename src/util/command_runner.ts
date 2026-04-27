import { stageFiles } from '@src/module/git/git_staged.js';
import { fileReport } from '@src/util/file_report.js';
import { logger } from '@src/util/logger.js';
import { execSync } from 'node:child_process';

const runCommand = (command: string, files?: string[]): void => {
  const filesToPass = command.includes('tsc') ? '' : files?.map((entry) => { return `"${entry}"`; }).join(' ') ?? '';

  logger.info(`Running: "${command}"...`);
  execSync(`${command} ${filesToPass}`, { stdio: 'inherit' });

  if (files && files.length > 0) {
    stageFiles(files);
  }

  if (files && files.length > 0) {
    fileReport(files);
  }
};

export { runCommand };