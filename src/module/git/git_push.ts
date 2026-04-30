import { loggerLoader } from '@src/util/logger.js';
import { execSync } from 'node:child_process';

const getPushFiles = (): string[] => {
  const output = execSync('git log --format="%h" HEAD --not --remotes')
    .toString()
    .trim()
    .split('\n')
    .filter(Boolean);
  const firstCommit = output[0] ?? '';
  const lastCommit = output.at(-1) ?? '';
  const outputLoader = execSync(`git diff --name-only ${firstCommit} ${lastCommit}`)
    .toString()
    .trim()
    .split('\n')
    .filter(Boolean);

  return outputLoader;
};

const gitPushTag = (version: string): void => {
  const loader = loggerLoader('Pushing tag to remote repository...');
  loader.start();
  execSync(`git push origin v${version}`, { stdio: 'ignore' });
  loader.stop();
};

const gitPushHead = (): void => {
  const loader = loggerLoader('Pushing changes to remote repository...');
  loader.start();
  execSync('git push origin HEAD', { stdio: 'ignore' });
  loader.stop();
};

export { gitPushTag, gitPushHead, getPushFiles };