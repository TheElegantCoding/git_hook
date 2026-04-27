import { getStagedFiles } from '@src/module/git/git_staged.js';
import { runCommand } from '@src/util/command_runner.js';
import { getConfiguration } from '@src/util/file_configuration.js';
import { logger } from '@src/util/logger.js';
import { getMatchingFiles } from '@src/util/pattern_matcher.js';

const preCommitTask = () => {
  try {
    const config = getConfiguration();
    const preCommitTaskConfig = config.preCommitTask as Record<string, string>;
    const stagedFiles = getStagedFiles();

    for (const [pattern, command] of Object.entries(preCommitTaskConfig)) {
      const matchingFiles = getMatchingFiles(pattern, stagedFiles);

      if (matchingFiles.length > 0) {
        runCommand(command, matchingFiles);
      }
    }

    if (stagedFiles.length > 0) {
      logger.success('All staged files have been validated and corrected.');
    }
  } catch (error) {
    logger.error(`pre commit failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
};

export { preCommitTask };