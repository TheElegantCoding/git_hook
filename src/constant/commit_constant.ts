const commonCommit = [
  'feat',
  'fix',
  'doc',
  'remove',
  'style',
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

const commitIcon: Record<string, { icon: string; label: string }> = {
  feat: { icon: ':sparkles:', label: 'Features' },
  fix: { icon: ':bug:', label: 'Bug Fixes' },
  remove: { icon: ':fire:', label: 'Removals' },
  doc: { icon: ':memo:', label: 'Documentation' },
  style: { icon: ':art:', label: 'Styles' },
  refactor: { icon: ':recycle:', label: 'Refactors' },
  perf: { icon: ':zap:', label: 'Performance' },
  test: { icon: ':test_tube:', label: 'Tests' },
  ci: { icon: ':construction_worker:', label: 'CI/CD' },
  update: { icon: ':arrow_up:', label: 'Updates' },
  breaking: { icon: ':rotating_light:', label: 'Breaking Changes' },
  config: { icon: ':wrench:', label: 'Configuration' },
  security: { icon: ':lock:', label: 'Security' },
  language: { icon: ':globe_with_meridians:', label: 'Languages' },
  typo: { icon: ':pencil2:', label: 'Typos' },
  asset: { icon: ':bento:', label: 'Assets' },
  package: { icon: ':package:', label: 'Dependencies' },
  revert: { icon: ':rewind:', label: 'Reverts' },
  release: { icon: ':rocket:', label: 'Releases' }
};

export { commitIcon, commonCommit };