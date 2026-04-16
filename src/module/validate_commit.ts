import { commonCommit } from '@src/constant/commit_constant.js';
import { getConfiguration } from '@src/util/file_configuration.js';
import { logger } from '@src/util/logger.js';
import fs from 'node:fs';

const commitMessage = () => {
  const messageFilePath = process.argv[2] ?? 'No commit message provided';

  if (!messageFilePath) {
    logger.error('Commit message file path is required.', { blankBelow: true });
    process.exit(1);
  }

  const message = fs.readFileSync(messageFilePath, 'utf8').trim();

  if (!message) {
    logger.error('Commit message is required.', { blankBelow: true });
    process.exit(1);
  }

  return message;
};

const validateCommitType = (message: string) => {
  const commitType = message.split(':')[0]?.split('(')[0]?.trim().toLowerCase();

  if (!commitType || !commonCommit.includes(commitType)) {
    logger.error(`Invalid commit type. allowed types are: ${commonCommit.join(', ')}`, { blankBelow: true });
    process.exit(1);
  }
};

const validateCommitLength = (message: string, maxLength: number) => {
  if (message.length > maxLength) {
    logger.error(`Commit message is too long. Maximum length is ${maxLength} characters.`, { blankBelow: true });
    process.exit(1);
  }
};

const validateCommitPattern = (message: string, maxLength: number, allowedTypes: string[]) => {
  const commitMessagePattern = new RegExp(String.raw`^(${allowedTypes.join('|')})(\([a-zA-Z0-9_-]+\))?: .{1,${maxLength}}$`);

  if (!commitMessagePattern.test(message)) {
    logger.error('Invalid commit message. It must follow the format: type(scope): description', { blankBelow: true });
    process.exit(1);
  }
};

const validateCommit = () => {
  logger.info('Validating commit message...', { blankAbove: true, blankBelow: true });
  const config = getConfiguration();
  const message = commitMessage();

  validateCommitType(message);
  validateCommitLength(message, config.commitlint.maxLength);
  validateCommitPattern(message, config.commitlint.maxLength, config.commitlint.allowedTypes);

  logger.success('Commit message is valid.', { blankBelow: true });
};

export { validateCommit };