/* eslint-disable no-console */
/* eslint-disable max-statements */
import { changelog, getFormattedCommits } from '@src/module/changelog.js';
import { logger } from '@src/util/logger.js';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const isWorkingDirectoryClean = () => {
  const status = execSync('git status --porcelain').toString().trim();

  if (status.length > 0) {
    logger.error('Working directory is not clean. Please commit or stash your changes before releasing.');
    process.exit(1);
  }
};

const getPackageVersion = (): string => {
  const packagePath = path.join(process.cwd(), 'package.json');

  if (!fs.existsSync(packagePath)) {
    return '0.0.0';
  }

  const packageContent = JSON.parse(fs.readFileSync(packagePath) as unknown as string) as { version: string };
  return packageContent.version;
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

const getNextVersion = (currentVersion: string, commits: string[]): string => {
  const featCounter = commits.filter((content) => { return content.toLowerCase().includes('feat:'); }).length;
  const hasBreaking = commits.some((content) => { return content.includes('breaking'); });
  const hasFix = commits.some((content) => { return content.toLowerCase().includes('fix:'); });

  return updateVersion(
    currentVersion,
    featCounter,
    hasBreaking,
    hasFix
  );
};

const updatePackageJson = (newVersion: string) => {
  const packagePath = path.join(process.cwd(), 'package.json');

  if (!fs.existsSync(packagePath)) {
    return;
  }

  const packageContent = JSON.parse(fs.readFileSync(packagePath) as unknown as string) as { version: string };
  packageContent.version = newVersion;
  fs.writeFileSync(packagePath, `${JSON.stringify(packageContent, null, 2)}\n`);
};

const githubRelease = (version: string, releaseNotes: string) => {
  execSync(`gh release create v${version} --title "Release ${version}" --notes "${releaseNotes}"`, { stdio: 'inherit' });
};

const generateRelease = (nextVersion: string) => {
  updatePackageJson(nextVersion);
  changelog();
  const releaseNotes = getFormattedCommits(nextVersion).join('\n');
  console.log(nextVersion, releaseNotes);

  execSync('git add package.json CHANGELOG.md');
  execSync(`git commit -m "release: ${nextVersion}"`, { stdio: 'inherit' });
  execSync('git push origin HEAD');
  execSync(`git tag v${nextVersion}`);
  logger.info(`Subiendo tag v${nextVersion} a GitHub...`);
  execSync(`git push origin v${nextVersion}`);
  githubRelease(nextVersion, releaseNotes);
  logger.success(`Released version ${nextVersion}`);
};

const release = () => {
  logger.info('Releasing new version');
  isWorkingDirectoryClean();
  const currentVersion = getPackageVersion();
  const commits = getFormattedCommits(currentVersion);
  const nextVersion = getNextVersion(currentVersion, commits);

  generateRelease(nextVersion);

  // try {
  // } catch (error) {
  //  execSync('git reset --soft HEAD~1');
  //  execSync(`git tag -d v${nextVersion}`);
  //  updatePackageJson(currentVersion);
  //  logger.error(`Release failed: ${(error as Error).message}`);
  // }
};

export { release };