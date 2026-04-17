/* eslint-disable ts/no-unnecessary-condition */
import { configuration } from '@src/constant/configuration.js';
import fs from 'node:fs';
import path from 'node:path';

import type { ConfigurationType } from '@src/type/configuration_type.js';

const getConfigurationFile = () => {
  const configPath = path.join(process.cwd(), '.gitlys.json');

  if (!fs.existsSync(configPath)) {
    return JSON.stringify(configuration);
  }
  const configContent = fs.readFileSync(configPath, 'utf8') as unknown as string;

  return configContent;
};

const getConfiguration = () => {
  const configContent = getConfigurationFile();
  const config = JSON.parse(configContent) as ConfigurationType;

  if (typeof config !== 'object' || config === null) {
    throw new Error('Invalid configuration format in .gitlys.json');
  }

  return {
    ...configuration,
    ...config,
    commitlint: { ...configuration.commitlint, ...config.commitlint },
    lintStaged: { ...configuration.lintStaged, ...config.lintStaged },
    release: { ...configuration.release, ...config.release },
    changelog: { ...configuration.changelog, ...config.changelog }
  };
};

export { getConfiguration };