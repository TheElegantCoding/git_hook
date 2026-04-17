import { getConfiguration } from '@src/util/file_configuration.js';
import { logger } from '@src/util/logger.js';
import fs from 'node:fs';
import path from 'node:path';

const checkGitDirectory = (directory: string): boolean => {
  const gitPath = path.join(directory, '.git');

  if (!fs.existsSync(gitPath)) {
    logger.warning('No .git directory found. Please run "git init" before installing Gitlys hooks.');
    return false;
  }

  if (!fs.statSync(gitPath).isDirectory()) {
    logger.warning('.git exists but is not a directory. Please ensure you are in a valid Git repository.');
    return false;
  }

  return true;
};

const installCommand = (gitHooksDirectory: string) => {
  const commitMessageHook = path.join(gitHooksDirectory, 'commit-msg');
  const precommitHook = path.join(gitHooksDirectory, 'pre-commit');
  const isProduction = import.meta.url.includes('node_modules');
  const configuration = getConfiguration();
  const install = isProduction ? 'npx tsx ./node_modules/gitlys/src/index.js "$1"' : `${configuration.packageManager} src/index.ts "$1"`;
  const lintStagedCommand = isProduction ? 'npx tsx ./node_modules/gitlys/src/lint_staged.js "$1"' : `${configuration.packageManager} src/lint_staged.ts`;

  const hookContent = `#!/bin/bash\n\n${install}`;
  const preCommitContent = `#!/bin/bash\n\n${lintStagedCommand}`;

  return {
    commitMessageHook,
    precommitHook,
    hookContent,
    preCommitContent
  };
};

const prepare = ({
  commitMessageHook,
  precommitHook,
  hookContent,
  preCommitContent
}: ReturnType<typeof installCommand>) => {
  fs.writeFileSync(commitMessageHook, hookContent);
  fs.chmodSync(commitMessageHook, '755');

  fs.writeFileSync(precommitHook, preCommitContent);
  fs.chmodSync(precommitHook, '755');

  logger.setup('Commit-msg and pre-commit hooks installed successfully.');
};

const init = () => {
  const projectRoot = process.env.INIT_CWD ?? process.cwd();
  const gitHooksDirectory = path.join(projectRoot, '.git', 'hooks');

  if (!checkGitDirectory(projectRoot)) {
    return;
  }

  const {
    commitMessageHook,
    precommitHook,
    hookContent,
    preCommitContent
  } = installCommand(gitHooksDirectory);

  try {
    prepare({
      commitMessageHook,
      precommitHook,
      hookContent,
      preCommitContent
    });
  } catch (error) {
    logger.error(`Error installing Gitlys hook: ${(error as Error).message}`);
  }
};

export { init };
