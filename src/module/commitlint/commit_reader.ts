import fs from 'node:fs';

const getCommitMessage = (messageFilePath?: string) => {
  if (!messageFilePath) {
    throw new Error('Commit message file path is required.');
  }

  const message = fs.readFileSync(messageFilePath, 'utf8').trim();

  if (!message) {
    throw new Error('Commit message is required.');
  }

  return message;
};

export { getCommitMessage };