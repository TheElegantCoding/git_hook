import { logger } from '@src/util/logger.js';

const handleError = (error: unknown, message?: string) => {
  const errorInstance = error as { stdout?: Buffer; stderr?: Buffer; message?: string };
  const output = errorInstance.stdout?.toString() ?? '';
  const stderr = errorInstance.stderr?.toString() ?? '';
  const errorMessage = errorInstance.message ?? errorInstance.toString();
  if (output && stderr) { logger.error(`Details:\n${output}`, { blankAbove: true }); }
  if (output && !stderr) { logger.error(`Details:\n${output}`, { blankAbove: true }); }
  if (stderr && !output) { logger.error(`Details:\n${stderr}`, { blankAbove: true }); }
  if (!output && !stderr) { logger.error(`${message ?? 'Error'}\n${errorMessage}`, { blankAbove: true }); }
  process.exit(2);
};

export { handleError };