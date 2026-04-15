import { logger } from '@src/util/logger.js';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.env.INIT_CWD ?? process.cwd();
const gitHooksDirectory = path.join(projectRoot, '.git', 'hooks');

if (fs.existsSync(gitHooksDirectory)) {
  const commitMessageHook = path.join(gitHooksDirectory, 'commit-msg');
  const precommitHook = path.join(gitHooksDirectory, 'pre-commit');
  const isProduction = false;
  // eslint-disable-next-line ts/no-unnecessary-condition
  const installCommand = isProduction ? 'npx tsx ./node_modules/tu-libreria/src/index.js "$1"' : 'bun src/index.ts "$1"';
  // eslint-disable-next-line ts/no-unnecessary-condition
  const lintStagedCommand = isProduction ? 'npx tsx ./node_modules/tu-libreria/src/index.js "$1"' : 'bun src/lint_staged.ts';

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