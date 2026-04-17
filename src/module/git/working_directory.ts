import { execSync } from 'node:child_process';

const isWorkingDirectoryClean = () => {
  const status = execSync('git status --porcelain').toString().trim();

  if (status.length > 0) {
    throw new Error('Working directory is not clean. Please commit or stash your changes before releasing.');
  }
};

export { isWorkingDirectoryClean };