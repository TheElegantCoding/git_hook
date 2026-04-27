type ConfigurationType = {
  prePushTask?: string[];
  preCommitTask?: Record<string, string>;
  release?: {
    releaseToGithub?: boolean;
  };
  packageManager?: 'npm' | 'bun' | 'yarn' | 'pnpm';
  commitlint?: {
    maxLength?: number;
    allowedTypes?: string[];
  };
  changelog?: {
    changelogPath?: string;
    generateChangelog?: boolean;
  };
};

export type { ConfigurationType };