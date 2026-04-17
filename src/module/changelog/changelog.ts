import { updateChangelog, createChangelogFile } from '@src/module/changelog/changelog_file.js';
import { getStagedCommit } from '@src/module/git/git_commit.js';
import { getCurrentVersion } from '@src/module/release/version.js';
import { logger } from '@src/util/logger.js';

import type { CommitType } from '@src/type/commit_type.js';

const changelog = (commits?: CommitType[]) => {
  try {
    createChangelogFile();

    const currentVersion = getCurrentVersion(false);
    const stagedCommits = getStagedCommit(currentVersion, false);

    updateChangelog(currentVersion, commits ?? stagedCommits);
    logger.success(`Changelog updated successfully for version ${currentVersion}`);
  } catch (error) {
    logger.error(`Error updating changelog: ${(error as Error).message}`);
    process.exit(1);
  }
};

export { changelog };