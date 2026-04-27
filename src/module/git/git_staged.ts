import { logger } from '@src/util/logger.js';
import { execSync } from 'node:child_process';

const getStagedFiles = (): string[] => {
  const stagedFiles = execSync('git diff --cached --name-only --diff-filter=d')
    .toString()
    .trim()
    .split('\n')
    .filter(Boolean);

  if (stagedFiles.length === 0) {
    logger.info('No staged files found. Skipping tasks.');
    return [];
  }

  return stagedFiles;
};

const stageFiles = (files: string[]): void => {
  execSync(`git add ${files.join(' ')}`);
};

export { stageFiles, getStagedFiles };