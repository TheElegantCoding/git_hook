import { commonCommit } from '@src/constant/commit_constant.js';

import type { ConfigurationType } from '@src/type/configuration_type.js';

const configuration: ConfigurationType = {
  commitlint: {
    allowedTypes: commonCommit,
    maxLength: 80
  },
  lintStaged: {
    '*.{ts,js,jsx,tsx,json,html,yml,yaml,astro}': 'bunx eslint --fix',
    '*.{css,scss}': 'bunx stylelint --fix',
    '*.{tf,tfvars}': 'terraform fmt'
  },
  release: {
    releaseToGithub: true
  },
  packageManager: 'bun'
};

export { configuration };