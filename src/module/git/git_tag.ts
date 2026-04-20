import { logger } from '@src/util/logger.js';
import { execSync } from 'node:child_process';

const createTag = (version: string) => {
  logger.info(`Creating git tag v${version}`);
  execSync(`git tag v${version}`, { stdio: 'ignore' });
};

const tagExists = (): boolean => {
  try {
    const tags = execSync('git tag --list').toString();
    return tags.length > 0;
  } catch {
    return false;
  }
};

export { tagExists, createTag };