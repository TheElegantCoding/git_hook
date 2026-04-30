import { loggerLoader } from '@src/util/logger.js';
import { execSync } from 'node:child_process';

const createTag = (version: string) => {
  const loader = loggerLoader(`Creating git tag v${version}`);
  loader.start();
  execSync(`git tag v${version}`, { stdio: 'pipe' });
  loader.stop();
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