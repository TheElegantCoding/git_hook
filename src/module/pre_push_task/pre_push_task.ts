import { runCommand } from '@src/util/command_runner.js';
import { getConfiguration } from '@src/util/file_configuration.js';
import { logger } from '@src/util/logger.js';

const prePushTask = () => {
  try {
    const config = getConfiguration();

    if (!config.prePushTask || config.prePushTask.length === 0) {
      return;
    }

    config.prePushTask.forEach((command) => { runCommand(command); });

    logger.success('Pre-push tasks completed successfully!');
  } catch (error) {
    logger.error(`Git push failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
};

export { prePushTask };