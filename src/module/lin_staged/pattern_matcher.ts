const getMatchingFiles = (pattern: string, stagedFiles: string[]): string[] => {
  const regexPattern = `${pattern
    .replaceAll('.', String.raw`\.`)
    .replaceAll(/{([^}]+)}/g, (_w, group: string) => { return `(${group.replaceAll(',', '|')})`; })
    .replaceAll('*', '.*')}$`;

  return stagedFiles.filter((file) => { return new RegExp(regexPattern).test(file); });
};

export { getMatchingFiles };