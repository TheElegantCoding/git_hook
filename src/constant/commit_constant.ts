import { colorAnsi } from 'logginlys';

const commonCommit = [
  'feat',
  'fix',
  'doc',
  'remove',
  'style',
  'chore',
  'refactor',
  'perf',
  'test',
  'ci',
  'update',
  'release',
  'breaking',
  'config',
  'typo',
  'asset',
  'package',
  'language',
  'security',
  'revert'
];

const commitType: Record<string, { icon: string; label: string; color?: string }> = {
  feat: { icon: ':sparkles:', label: 'Features', color: colorAnsi.green },
  update: { icon: ':arrow_up:', label: 'Updates', color: colorAnsi.green },
  release: { icon: ':rocket:', label: 'Releases', color: colorAnsi.green },

  style: { icon: ':art:', label: 'Styles', color: colorAnsi.purple },

  refactor: { icon: ':recycle:', label: 'Refactors', color: colorAnsi.cyan },
  test: { icon: ':test_tube:', label: 'Tests', color: colorAnsi.cyan },
  language: { icon: ':globe_with_meridians:', label: 'Languages', color: colorAnsi.cyan },

  doc: { icon: ':memo:', label: 'Documentation', color: colorAnsi.blue },
  ci: { icon: ':construction_worker:', label: 'CI/CD', color: colorAnsi.blue },
  config: { icon: ':wrench:', label: 'Configuration', color: colorAnsi.blue },
  security: { icon: ':lock:', label: 'Security', color: colorAnsi.blue },

  remove: { icon: ':fire:', label: 'Removals', color: colorAnsi.red },
  revert: { icon: ':rewind:', label: 'Reverts', color: colorAnsi.red },
  breaking: { icon: ':rotating_light:', label: 'Breaking Changes', color: colorAnsi.red },

  perf: { icon: ':zap:', label: 'Performance', color: colorAnsi.yellow },
  fix: { icon: ':bug:', label: 'Bug Fixes', color: colorAnsi.yellow },
  typo: { icon: ':pencil2:', label: 'Typos', color: colorAnsi.yellow },
  asset: { icon: ':bento:', label: 'Assets', color: colorAnsi.yellow },
  package: { icon: ':package:', label: 'Dependencies', color: colorAnsi.yellow }
};

export { commitType, commonCommit };