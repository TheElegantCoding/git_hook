import { tagExists } from '@src/module/git/git_tag.js';
import { reportLogger } from '@src/util/file_logger.js';
import { logger } from '@src/util/logger.js';
import { colorAnsi, loggerStyle } from 'logginlys';
import { execSync } from 'node:child_process';

import type { CommitType } from '@src/type/commit_type.js';

const commitStagedVersionFiles = (nextVersion: string): void => {
  logger.info(`Committing staged files for version ${nextVersion}...`, { blankAbove: true });
  execSync('git add package.json CHANGELOG.md', { stdio: 'ignore' });
  execSync(`git commit -m "release: ${nextVersion}"`, { stdio: 'ignore' });
};

const checkStagedCommits = (commitStaged: CommitType[]) => {
  const filteredResult = commitStaged.filter((commit) => {
    return commit.author !== undefined && commit.hash !== undefined && commit.message !== undefined;
  });

  if (filteredResult.length === 0) {
    throw new Error('No valid commits found since last version. Please ensure there are staged commits to release.');
  }

  return filteredResult;
};

const getStagedCommit = (currentVersion: string, reportCommits = true) => {
  let commits: string[] = [];

  commits = tagExists()
    ? execSync(`git log v${currentVersion}..HEAD --pretty=format:"%s|%h|%an"`).toString().trim().split('\n')
    : execSync('git log --pretty=format:"%s|%h|%an"').toString().trim().split('\n');

  const result: CommitType[] = [];

  commits.forEach((entry) => {
    const [
      message,
      hash,
      author
    ] = entry.split('|');

    result.push({
      message: message?.trim(),
      hash: hash?.trim(),
      author: author?.trim(),
      type: message?.split(':')[0]?.toLowerCase() ?? '',
      cleanMessage: message?.split(':').slice(1).join(':').trim() ?? ''
    });
  });

  const filteredResult = checkStagedCommits(result);

  const gitIcon = loggerStyle.ansi('\udb80\udea2', { color: colorAnsi.red });
  if (reportCommits) {
    logger.info(`Found ${gitIcon}${colorAnsi.blue} ${result.length} staged commits, since last version:`, { blankBelow: true });
    result.forEach((entry) => { reportLogger.commit(entry); });
  }

  return filteredResult;
};

export { getStagedCommit, commitStagedVersionFiles };