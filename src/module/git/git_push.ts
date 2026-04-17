import { execSync } from 'node:child_process';

const gitPushTag = (version: string): void => {
  execSync(`git push origin v${version}`, { stdio: 'ignore' });
};

const gitPushHead = (): void => {
  execSync('git push origin HEAD', { stdio: 'ignore' });
};

export { gitPushTag, gitPushHead };