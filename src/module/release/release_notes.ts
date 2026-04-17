import { commitType } from '@src/constant/commit_constant.js';
import { getRepoUrl } from '@src/module/git/git_repo_url.js';

import type { CommitType } from '@src/type/commit_type.js';

const generateReleaseNotes = (version: string, commits: CommitType[]) => {
  const github = 'https://github.com';
  const gitUrl = getRepoUrl();

  const groupedCommits = commits.reduce<Record<string, CommitType[]>>((accumulator, commit) => {
    const { type } = commit;

    if (type) {
      accumulator[type] ??= [];
      accumulator[type].push(commit);
    } else {
      accumulator.other = [];
      accumulator.other.push(commit);
    }

    return accumulator;
  }, {});

  const sections = Object.entries(groupedCommits).map(([type, commitsList]) => {
    const config = commitType[type];
    if (!config) { return ''; }

    const header = `### ${config.icon} ${config.label}`;

    const body = commitsList.map((commit) => {
      const { message, hash, author } = commit;
      return `- ${message} [[${hash}](${gitUrl}/commit/${hash})] by [@${author}](${github}/${author})`;
    }).join('\n');

    return `${header}\n\n${body}`;
  });

  return `## Release 🚀 [${version}]\n\n${sections.filter(Boolean).join('\n\n')}`;
};

export { generateReleaseNotes };