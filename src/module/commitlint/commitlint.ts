import { validateCommit } from '@src/module/commitlint/commit_validator.js';
import { logger } from '@src/util/logger.js';

const commitLint = () => {
  try {
    const commandMessage = process.argv[2];
    validateCommit(commandMessage);
  } catch (error) {
    logger.error(error instanceof Error ? error.message : 'An unknown error occurred during commit linting.');
    process.exit(1);
  }
};

export { commitLint };