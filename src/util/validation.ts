import { execSync } from 'node:child_process';

const isGhInstalled = (): boolean => {
  try {
    const command = process.platform === 'win32' ? 'where gh' : 'command -v gh';
    execSync(command, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

export { isGhInstalled };