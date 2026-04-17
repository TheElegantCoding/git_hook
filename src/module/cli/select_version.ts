import { select } from '@inquirer/prompts';
import { getNextVersion } from '@src/module/release/version.js';
import { logger } from '@src/util/logger.js';

const selectVersion = async (currentVersion: string): Promise<string> => {
  logger.blank();

  try {
    const version: 'patch' | 'minor' | 'major' = await select({
      message: 'Choose a version bump:',
      choices: [
        { name: 'Major', value: 'major', description: 'Breaking changes that may not be backward compatible' },
        { name: 'Minor', value: 'minor', description: 'New features that are backward compatible' },
        { name: 'Patch', value: 'patch', description: 'Backward compatible bug fixes' }
      ]
    });

    return getNextVersion(currentVersion, version);
  } catch {
    throw new Error('Failed to select version');
  }
};

export { selectVersion };
