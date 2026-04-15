/* eslint-disable max-depth */
/* eslint-disable max-statements */
import { getConfiguration } from '@src/util/file_configuration.js';
import { fileLogger } from '@src/util/file_logger.js';
import { loader } from '@src/util/loader.js';
import { logger } from '@src/util/logger.js';
import { getLongerName } from '@src/util/longer_name.js';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const lintStaged = () => {
  try {
    const config = getConfiguration();
    const rules = config.lintStaged;

    const stagedFiles = execSync('git diff --cached --name-only --diff-filter=d')
      .toString()
      .trim()
      .split('\n')
      .filter(Boolean);

    if (stagedFiles.length === 0) {
      logger.info('No staged files to lint.');
      return;
    }

    if (Object.keys(rules).length === 0) {
      logger.warning('No se definieron reglas en "lintStaged" dentro de .gitlys.json');
      return;
    }

    for (const [pattern, command] of Object.entries(rules)) {
      const regexPattern = `${pattern
        .replaceAll('.', String.raw`\.`)
        .replaceAll(/{([^}]+)}/g, (_w, group: string) => { return `(${group.replaceAll(',', '|')})`; })
        .replaceAll('*', '.*')}$`;

      const matchingFiles = stagedFiles.filter((file) => { return new RegExp(regexPattern).test(file); });

      if (matchingFiles.length > 0) {
        const loaderInstance = loader(`Linting: "${command}" on pattern: "${pattern}"`);

        logger.blank();
        loaderInstance.start();

        try {
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
        } catch (error) {
          process.stdout.write('\r\u001b[2K');
          loaderInstance.stop();
          logger.blank();
          logger.error(`Error linting: ${command}`);
          const errorMessage = error as { stderr: Buffer; status: number; stdout?: Buffer };

          if (errorMessage.stdout) {
            logger.error(errorMessage.stdout.toString());
          }
          process.exit(1);
        }
      }
    }

    /*
    for (const file of stagedFiles) {
      const rule = Object.entries(rules).find(([pattern]) => {
        const regexPattern = `${pattern
          .replaceAll('.', String.raw`\.`)
          .replaceAll(/{([^}]+)}/g, (_w, group: string) => { return `(${group.replaceAll(',', '|')})`; })
          .replaceAll('*', '.*')}$`;

        return new RegExp(regexPattern).test(file);
      });

      if (rule) {
        const command = rule[1];
        const loaderInstance = loader(`Linting: "${command}" on rule: "${rule[0]}"`);

        logger.blank();
        loaderInstance.start();

        try {
          execSync(`${command} ${file}`, { stdio: 'pipe' });
          execSync(`git add ${file}`);
          loaderInstance.stop();
        } catch (error) {
          loaderInstance.stop();
          logger.blank();
          logger.error(`Error linting: ${command}`);
          const errorMessage = error as { stderr: Buffer; status: number; stdout?: Buffer };

          if (errorMessage.stdout) {
            logger.error(errorMessage.stdout.toString());
          }
          process.exit(1);
        } finally {
          process.stdout.write('\r\u001b[2K');
          loaderInstance.stop();
        }
      }
    }
    */

    logger.success('All staged files have been validated and corrected.');
  } catch {
    logger.blank();
    logger.error('Critical error while fetching Git files.');
    process.exit(1);
  }
};

export { lintStaged };