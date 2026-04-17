import { changelog } from '@src/module/changelog/changelog.js';
import { commitStagedVersionFiles } from '@src/module/git/git_commit.js';
import { gitPushTag, gitPushHead } from '@src/module/git/git_push.js';
import { createTag } from '@src/module/git/git_tag.js';
import { githubCreateRelease } from '@src/module/git/github_release.js';
import { updatePackageJson } from '@src/module/release/version.js';
import { logger } from '@src/util/logger.js';

const generateRelease = (nextVersion: string, releaseNotes: string) => {
  updatePackageJson(nextVersion);
  changelog();
  commitStagedVersionFiles(nextVersion);
  createTag(nextVersion);
  gitPushHead();
  gitPushTag(nextVersion);
  githubCreateRelease(nextVersion, releaseNotes);
  logger.success(`Release process completed successfully! New version: ${nextVersion}`);
};

export { generateRelease };