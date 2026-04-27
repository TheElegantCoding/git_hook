import { stageFiles } from '@src/module/git/git_staged.js';
import { fileReport } from '@src/util/file_report.js';
import { loggerLoader } from '@src/util/logger.js';
import { execSync } from 'node:child_process';

const runCommand = (command: string, files?: string[]): void => {
  const spinner = loggerLoader(`Running: "${command}"`);
  const filesToPass = command.includes('tsc') ? '' : files?.map((entry) => { return `"${entry}"`; }).join(' ') ?? '';

  try {
    spinner.start();
    execSync(`${command} ${filesToPass}`, { stdio: 'inherit' });

    if (files && files.length > 0) {
      stageFiles(files);
    }

    spinner.stop();

    if (files && files.length > 0) {
      fileReport(files);
    }
  } catch (error) {
    spinner.stop();
    throw error;
  }
};

export { runCommand };