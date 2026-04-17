/* eslint-disable max-statements */
import { getStagedFiles } from '@src/module/git/git_staged.js';
import { runLintCommand } from '@src/module/lin_staged/command_runner.js';
import { getMatchingFiles } from '@src/module/lin_staged/pattern_matcher.js';
import { getConfiguration } from '@src/util/file_configuration.js';
import { logger } from '@src/util/logger.js';

const lintStaged = () => {
  try {
    const config = getConfiguration();
    const lintStagedConfig = config.lintStaged as Record<string, string>;
    const stagedFiles = getStagedFiles();

    for (const [pattern, command] of Object.entries(lintStagedConfig)) {
      const matchingFiles = getMatchingFiles(pattern, stagedFiles);

      if (matchingFiles.length > 0) {
        runLintCommand(command, pattern, matchingFiles);
      }
    }

    if (stagedFiles.length > 0) {
      logger.success('All staged files have been validated and corrected.');
    }
  } catch (error) {
    logger.error(`Linting failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
};

export { lintStaged };