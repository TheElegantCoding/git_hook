import { getConfiguration } from '@src/util/file_configuration.js';
import { logger } from '@src/util/logger.js';
import { execSync } from 'node:child_process';
import fs from 'node:fs';

const githubCreateRelease = (version: string, releaseNotes: string) => {
  const configuration = getConfiguration();

  if (configuration.release?.releaseToGithub === false) {
    return;
  }

  const temporaryNotesPath = './TEMP_RELEASE_NOTES.md';

  logger.info(`Creating GitHub release for version ${version}...`);
  fs.writeFileSync(temporaryNotesPath, releaseNotes, 'utf8');
  execSync(`gh release create v${version} --title "Release ${version}" --notes-file "${temporaryNotesPath}"`, { stdio: 'ignore' });
  fs.unlinkSync(temporaryNotesPath);
};

export { githubCreateRelease };