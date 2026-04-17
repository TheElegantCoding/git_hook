import { selectVersion } from '@src/module/cli/select_version.js';
import { getStagedCommit } from '@src/module/git/git_commit.js';
import { isWorkingDirectoryClean } from '@src/module/git/working_directory.js';
import { generateRelease } from '@src/module/release/generate_release.js';
import { generateReleaseNotes } from '@src/module/release/release_notes.js';
import { getCurrentVersion } from '@src/module/release/version.js';
import { logger } from '@src/util/logger.js';

const release = async () => {
  try {
    logger.info('Releasing new version');
    isWorkingDirectoryClean();
    const currentVersion = getCurrentVersion();
    const commits = getStagedCommit(currentVersion);
    const nextVersion = await selectVersion(currentVersion);
    const releaseNotes = generateReleaseNotes(nextVersion, commits);

    generateRelease(nextVersion, releaseNotes, commits);
  } catch (error) {
    logger.error(`Error during release process: ${(error as Error).message}`);
    process.exit(1);
  }
};

export { release };
