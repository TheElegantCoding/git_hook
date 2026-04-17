import { stageFiles } from '@src/module/git/git_staged.js';
import { fileReport } from '@src/util/file_report.js';
import { loggerLoader } from '@src/util/logger.js';
import { execSync } from 'node:child_process';

const runLintCommand = (command: string, pattern: string, files: string[]): void => {
  const spinner = loggerLoader(`Linting: "${command}" on pattern: "${pattern}"`);
  const filesToPass = command.includes('tsc') ? '' : files.map((entry) => { return `"${entry}"`; }).join(' ');

  try {
    spinner.start();
    execSync(`${command} ${filesToPass}`, { stdio: 'pipe' });
    stageFiles(files);
    spinner.stop();
    fileReport(files);
  } catch (error) {
    spinner.stop();
    throw error;
  }
};

export { runLintCommand };