import { select } from '@inquirer/prompts';
import { logger } from '@src/util/logger.js';

const selectVersion = async (): Promise<string> => {
  logger.blank();

  try {
    const version = await select({
      message: 'Choose a version bump:',
      choices: [
        { name: 'Major', value: 'major', description: 'Breaking changes that may not be backward compatible' },
        { name: 'Minor', value: 'minor', description: 'New features that are backward compatible' },
        { name: 'Patch', value: 'patch', description: 'Backward compatible bug fixes' }
      ]
    });

    return version;
  } catch {
    throw new Error('Failed to select version');
  }
};

export { selectVersion };
