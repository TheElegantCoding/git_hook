/* eslint-disable ts/no-unnecessary-condition */
import { configuration } from '@src/constant/configuration.js';
import fs from 'node:fs';
import path from 'node:path';

import type { ConfigurationType } from '@src/type/configuration_type.js';

const getConfiguration = () => {
  const configPath = path.join(process.cwd(), '.gitlys.json');

  if (!fs.existsSync(configPath)) {
    return configuration;
  }

  const configContent = fs.readFileSync(configPath, 'utf8') as unknown as string;
  const config = JSON.parse(configContent) as ConfigurationType;

  if (typeof config !== 'object' || config === null) {
    throw new Error('Invalid configuration format in .gitlys.json');
  }

  config.commitlint ||= configuration.commitlint;
  config.lintStaged ||= configuration.lintStaged;

  return config;
};

export { getConfiguration };