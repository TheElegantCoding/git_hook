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

const updateVersion = (
  currentVersion: string,
  featCounter: number,
  hasBreaking: boolean,
  hasFix: boolean
): string => {
  let [
    major,
    minor,
    patch
  ] = currentVersion.split('.').map(Number) as [number, number, number];

  if (hasBreaking || featCounter >= 10) {
    major++;
    minor = 0;
    patch = 0;
  } else if (featCounter > 0) {
    minor++;
    patch = 0;
  } else if (hasFix) {
    patch++;
  }

  return `${major}.${minor}.${patch}`;
};

const getNextVersion = (currentVersion: string, commits: string[], bump?: string): string => {
  const featCounter = commits.filter((content) => { return content.toLowerCase().includes('feat:'); }).length;
  const hasBreaking = commits.some((content) => { return content.includes('breaking'); });
  const hasFix = commits.some((content) => { return content.toLowerCase().includes('fix:'); });

  if (bump === 'major') {
    return updateVersion(
      currentVersion,
      featCounter,
      true,
      hasFix
    );
  }

  if (bump === 'minor') {
    return updateVersion(
      currentVersion,
      10,
      hasBreaking,
      hasFix
    );
  }

  if (bump === 'patch') {
    return updateVersion(
      currentVersion,
      featCounter,
      hasBreaking,
      true
    );
  }

  return updateVersion(
    currentVersion,
    featCounter,
    hasBreaking,
    hasFix
  );
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

export { getNextVersion, getCurrentVersion, updatePackageJson };