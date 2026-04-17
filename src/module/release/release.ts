/* eslint-disable style/max-len */
import { getStagedCommit } from '@src/module/git/git_commit.js';
import { isWorkingDirectoryClean } from '@src/module/git/working_directory.js';
import { generateRelease } from '@src/module/release/generate_release.js';
import { generateReleaseNotes } from '@src/module/release/release_notes.js';
import { getNextVersion, getCurrentVersion } from '@src/module/release/version.js';
import { logger } from '@src/util/logger.js';

const release = (bump?: string) => {
  try {
    logger.info('Releasing new version');
    isWorkingDirectoryClean();
    const currentVersion = getCurrentVersion();
    const commits = getStagedCommit(currentVersion);
    const nextVersion = getNextVersion(currentVersion, commits.map((commit) => { return commit.message; }) as string[], bump);
    const releaseNotes = generateReleaseNotes(nextVersion, commits);

    generateRelease(nextVersion, releaseNotes, commits);
  } catch (error) {
    logger.error(`Error during release process: ${(error as Error).message}`);
    process.exit(1);
  }
};

export { release };
