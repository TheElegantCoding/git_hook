import { commitIcon, commonCommit } from '@src/constant/commit_constant.js';
import { logger } from '@src/util/logger.js';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const defaultChangelog = `# Changelog

All notable changes to this project will be documented in this file.

### Versioning rules

- **MAJOR**: when you make incompatible API changes or big changes in the project.
- **MINOR**: when you add additional functionality
- **PATCH**: with small changes in the project.

One version have a structure like this (semantic version) - (version) - (date)

The list of changes have the description - commit - author.

---

## Released
`;

const getCurrentVersion = (): string => {
  const packagePath = path.join(process.cwd(), 'package.json');

  if (!fs.existsSync(packagePath)) {
    return '0.0.0';
  }

  const packageContent = JSON.parse(fs.readFileSync(packagePath) as unknown as string) as { version: string };
  return packageContent.version;
};

const generateChangelog = (changelogPath?: string) => {
  const fullPath = path.join(process.cwd(), changelogPath ?? 'CHANGELOG.md');

  if (!fs.existsSync(fullPath)) {
    logger.info('Generating changelog...');
    fs.writeFileSync(fullPath, defaultChangelog);
  }
};

const validateExistingVersion = (version: string, fullPath: string): boolean => {
  const existingContent = fs.readFileSync(fullPath, 'utf8');
  const versionHeader = `## 🚀 Version [${version}]`;

  if (existingContent.includes(versionHeader)) {
    return true;
  }
  return false;
};

const createEntry = (version: string, fullPath: string, changes: string[]): string => {
  const date = new Date().toISOString().split('T')[0];
  const existingContent = fs.readFileSync(fullPath, 'utf8');
  const newEntry = `## 🚀 Version [${version}] - ${date}\n\n${changes.join('\n')}\n`;

  const updatedContent = existingContent.replace('## Released', `## Released\n\n${newEntry}`);
  return updatedContent;
};

const updateChangelog = (version: string, changes: string[]) => {
  const fullPath = path.join(process.cwd(), 'CHANGELOG.md');

  if (!fs.existsSync(fullPath)) {
    logger.error('Changelog file does not exist. Please generate it first.');
    return;
  }

  if (validateExistingVersion(version, fullPath)) {
    return;
  }

  const updatedContent = createEntry(version, fullPath, changes);
  fs.writeFileSync(fullPath, updatedContent);
};

const getRawLog = (currentVersion: string): string[] => {
  try {
    execSync(`git rev-parse v${currentVersion}`, { stdio: 'ignore' });
    const rawLog = execSync(`git log v${currentVersion}..HEAD --pretty=format:"%s|%h|%an"`).toString().trim().split('\n');
    return rawLog;
  } catch {
    const rawLog = execSync('git log --pretty=format:"%s|%h|%an"').toString().trim().split('\n');
    return rawLog;
  }
};

const getFormattedCommits = (currentVersion: string): string[] => {
  const github = 'https://github.com';
  const gitUrl = execSync('git config --get remote.origin.url').toString().trim().replace(/\.git$/, '');
  const rawLog = getRawLog(currentVersion);
  const formattedLog: string[] = [];
  const commitLog = rawLog.map((entry) => {
    const [
      message,
      hash,
      author
    ] = entry.split('|');

    return `${message} - [${hash}](${gitUrl}/commit/${hash}) - by [${author}](${github}/${author})`;
  });

  const commitType = commonCommit.reduce<Record<string, string[]>>((accumulator, type) => {
    accumulator[type] = [];
    return accumulator;
  }, {});

  commitLog.forEach((entry) => {
    const messageLower = entry.toLowerCase();
    const typeFound = commonCommit.find((type) => {
      return messageLower.startsWith(type.toLowerCase())
        || messageLower.includes(`${type.toLowerCase()}:`);
    });

    if (typeFound) {
      commitType[typeFound]?.push(entry);
    }
  });

  Object.entries(commitType).forEach(([key, value]) => {
    const validCommits = value.filter((commit) => { return commit.trim() !== ''; });

    if (value.length > 0) {
      const category = commitIcon[key];

      formattedLog.push(`### ${category?.icon} ${category?.label}\n`);

      validCommits.forEach((commit) => {
        const cleanCommit = commit.replace(/^- /, '').trim();
        formattedLog.push(`- ${cleanCommit}`);
      });

      formattedLog.push('');
    }
  });

  return formattedLog;
};

const changelog = () => {
  generateChangelog();
  const currentVersion = getCurrentVersion();
  const formattedLog = getFormattedCommits(currentVersion);

  updateChangelog(currentVersion, formattedLog);
};

export { changelog, getFormattedCommits };