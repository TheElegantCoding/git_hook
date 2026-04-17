import { loggerLoader } from '@src/util/logger.js';
import { execSync } from 'node:child_process';

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

export { gitPushTag, gitPushHead };