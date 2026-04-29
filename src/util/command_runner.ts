import { stageFiles } from '@src/module/git/git_staged.js';
import { loggerLoader } from '@src/util/logger.js';
import { execSync } from 'node:child_process';

const runCommand = (command: string, files?: string[]): void => {
  const filesToPass = command.includes('tsc') ? '' : files?.map((entry) => { return `"${entry}"`; }).join(' ') ?? '';
  const loader = loggerLoader(`Running: "${command}"...`);

  loader.start();
  execSync(`${command} ${filesToPass}`, { stdio: 'pipe' });

  if (files && files.length > 0) {
    stageFiles(files);
  }

  loader.stop();
};

export { runCommand };