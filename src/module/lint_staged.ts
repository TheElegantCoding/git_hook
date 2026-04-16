import { getConfiguration } from '@src/util/file_configuration.js';
import { fileLogger } from '@src/util/file_logger.js';
import { loader } from '@src/util/loader.js';
import { logger } from '@src/util/logger.js';
import { getLongerName } from '@src/util/longer_name.js';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

import type { LoggerLoader } from 'logginlys';

const getStagedFiles = (): string[] => {
  const stagedFiles = execSync('git diff --cached --name-only --diff-filter=d')
    .toString()
    .trim()
    .split('\n')
    .filter(Boolean);

  if (stagedFiles.length === 0) {
    logger.info('No staged files to lint.');
    return [];
  }

  return stagedFiles;
};

const validateRules = (rules: Record<string, string>): void => {
  if (Object.keys(rules).length === 0) {
    logger.warning('No se definieron reglas en "lintStaged" dentro de .gitlys.json');
  }
};

const getMatchingFiles = (pattern: string, stagedFiles: string[]): string[] => {
  const regexPattern = `${pattern
    .replaceAll('.', String.raw`\.`)
    .replaceAll(/{([^}]+)}/g, (_w, group: string) => { return `(${group.replaceAll(',', '|')})`; })
    .replaceAll('*', '.*')}$`;

  return stagedFiles.filter((file) => { return new RegExp(regexPattern).test(file); });
};

const executeCommand = (matchingFiles: string[], command: string, loaderInstance: LoggerLoader): void => {
  logger.blank();
  loaderInstance.start();
  execSync(`${command} ${matchingFiles.join(' ')}`, { stdio: 'pipe' });
  execSync(`git add ${matchingFiles.join(' ')}`);
  process.stdout.write('\r\u001b[2K');
  loaderInstance.stop();
  logger.blank();
  const longerName = getLongerName(matchingFiles);

  matchingFiles.forEach((file) => {
    const absolutePath = path.isAbsolute(file)
      ? file
      : path.join(process.cwd(), file);
    if (fs.existsSync(absolutePath)) {
      const buffer = fs.readFileSync(absolutePath);
      const fileObject = new File([buffer], path.basename(file));
      fileLogger.file(fileObject, longerName);
    }
  });
};

const errorLinting = (command: string, loaderInstance: LoggerLoader, error: unknown) => {
  process.stdout.write('\r\u001b[2K');
  loaderInstance.stop();
  logger.blank();
  logger.error(`Error linting: ${command}`);
  const errorMessage = error as { stderr: Buffer; status: number; stdout?: Buffer };

  if (errorMessage.stdout) {
    logger.error(errorMessage.stdout.toString());
  }

  process.exit(1);
};

const validateMatchingFiles = (matchingFiles: string[], command: string, pattern: string) => {
  if (matchingFiles.length > 0) {
    const loaderInstance = loader(`Linting: "${command}" on pattern: "${pattern}"`);

    try {
      executeCommand(matchingFiles, command, loaderInstance);
    } catch (error) {
      errorLinting(command, loaderInstance, error);
    }
  }
};

const lintStaged = () => {
  try {
    const config = getConfiguration();
    validateRules(config.lintStaged);

    for (const [pattern, command] of Object.entries(config.lintStaged)) {
      const matchingFiles = getMatchingFiles(pattern, getStagedFiles());

      validateMatchingFiles(matchingFiles, command, pattern);
    }

    logger.success('All staged files have been validated and corrected.');
  } catch {
    logger.error('Critical error while fetching Git files.');
    process.exit(1);
  }
};

export { lintStaged };