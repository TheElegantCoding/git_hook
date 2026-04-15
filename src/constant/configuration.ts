import { commonCommit } from '@src/constant/commit_constant.js';

import type { ConfigurationType } from '@src/type/configuration_type.js';

const configuration: ConfigurationType = {
  commitlint: {
    allowedTypes: commonCommit,
    maxLength: 80
  },
  lintStaged: {
    '*.{ts,tsx}': 'bunx eslint --fix',
    '*.{html}': 'bunx eslint --fix'
  }
};

export { configuration };