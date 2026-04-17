import { execSync } from 'node:child_process';

const getRepoUrl = (): string => {
  return execSync('git config --get remote.origin.url').toString().trim().replace(/\.git$/, '');
};

export { getRepoUrl };