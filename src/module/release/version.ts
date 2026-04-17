import { logger } from '@src/util/logger.js';
import fs from 'node:fs';
import path from 'node:path';

const updatePackageJson = (newVersion: string) => {
  const packagePath = path.join(process.cwd(), 'package.json');

  if (!fs.existsSync(packagePath)) {
    return;
  }

  const packageContent = JSON.parse(fs.readFileSync(packagePath) as unknown as string) as { version: string };
  packageContent.version = newVersion;
  fs.writeFileSync(packagePath, `${JSON.stringify(packageContent, null, 2)}\n`);
};

const getCurrentVersion = (logInfo = true): string => {
  const packagePath = path.join(process.cwd(), 'package.json');

  if (!fs.existsSync(packagePath)) {
    return '0.0.0';
  }

  const packageContent = JSON.parse(fs.readFileSync(packagePath) as unknown as string) as { version: string };
  if (logInfo) {
    logger.info(`Current version: ${packageContent.version}`);
  }
  return packageContent.version;
};

export { getCurrentVersion, updatePackageJson };