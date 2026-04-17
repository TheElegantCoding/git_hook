import { getConfiguration } from '@src/util/file_configuration.js';
import { logger, loggerLoader } from '@src/util/logger.js';
import { isGhInstalled } from '@src/util/validation.js';
import { execSync } from 'node:child_process';
import fs from 'node:fs';

import type { ConfigurationType } from '@src/type/configuration_type.js';

const checkGithubRelease = (configuration: ConfigurationType) => {
  if (configuration.release?.releaseToGithub === false) {
    return false;
  }

  if (!isGhInstalled()) {
    logger.warning('GitHub CLI (gh) is not installed. Skipping GitHub release creation.');
    return false;
  }

  return true;
};

const githubCreateRelease = (version: string, releaseNotes: string) => {
  const configuration = getConfiguration();

  if (!checkGithubRelease(configuration)) {
    return;
  }

  const temporaryNotesPath = './TEMP_RELEASE_NOTES.md';

  const loader = loggerLoader(`Creating GitHub release for version ${version}...`);
  loader.start();
  fs.writeFileSync(temporaryNotesPath, releaseNotes, 'utf8');
  execSync(`gh release create v${version} --title "Release ${version}" --notes-file "${temporaryNotesPath}"`, { stdio: 'ignore' });
  fs.unlinkSync(temporaryNotesPath);
  loader.stop();
};

export { githubCreateRelease };