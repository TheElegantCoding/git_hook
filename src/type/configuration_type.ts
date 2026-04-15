type ConfigurationType = {
  lintStaged: Record<string, string>;
  commitlint: {
    maxLength: number;
    allowedTypes: string[];
  };
};

export type { ConfigurationType };