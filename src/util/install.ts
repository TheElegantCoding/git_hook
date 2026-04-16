import { getConfiguration } from '@src/util/file_configuration.js';
import { logger } from '@src/util/logger.js';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.env.INIT_CWD ?? process.cwd();
const gitHooksDirectory = path.join(projectRoot, '.git', 'hooks');

if (fs.existsSync(gitHooksDirectory)) {
  const commitMessageHook = path.join(gitHooksDirectory, 'commit-msg');
  const precommitHook = path.join(gitHooksDirectory, 'pre-commit');
  const isProduction = import.meta.url.includes('node_modules');
  const configuration = getConfiguration();
  const installCommand = isProduction ? 'npx tsx ./node_modules/gitlys/src/index.js "$1"' : `${configuration.packageManager} src/index.ts "$1"`;
  const lintStagedCommand = isProduction ? 'npx tsx ./node_modules/gitlys/src/lint_staged.js "$1"' : `${configuration.packageManager} src/lint_staged.ts`;

  const hookContent = `#!/bin/bash
${installCommand}
`;
  const preCommitContent = `#!/bin/bash
${lintStagedCommand}
`;

  try {
    fs.writeFileSync(commitMessageHook, hookContent);
    fs.chmodSync(commitMessageHook, '755');

    fs.writeFileSync(precommitHook, preCommitContent);
    fs.chmodSync(precommitHook, '755');

    logger.setup('Hook de commit-msg y pre-commit instalados correctamente.');
  } catch (error) {
    logger.error(`Error instalando el hook de Astralys: ${(error as Error).message}`);
  }
} else {
  logger.warning('No se detectó una carpeta .git. El hook no fue instalado.');
}