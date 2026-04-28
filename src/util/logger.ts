import {
  colorAnsi,
  loggerIcon,
  LogManager,
  loggerStyle
} from 'logginlys';

const logger = new LogManager();

const loggerLoader = (message: string) => {
  const badge = loggerStyle.ansi(` ${loggerIcon.info} INFO `, { color: colorAnsi.blue, bg: colorAnsi.bgBlue, bold: true });
  const successBadge = loggerStyle.ansi(` ${loggerIcon.check} SUCCESS `, { color: colorAnsi.green, bg: colorAnsi.bgGreen, bold: true });
  const messageLoader = loggerStyle.ansi(message, { bold: true });
  const finalMessage = `${loggerStyle.ansi(message, { bold: true })} ${loggerStyle.ansi(loggerIcon.check, { color: colorAnsi.green, bold: true })}`;

  const loaderInstance = logger.loader({
    message: `${badge} ${messageLoader}`,
    showTimestamp: true,
    type: 'aesthetic',
    finalMessage: `${successBadge} ${finalMessage}`
  });

  return loaderInstance;
};

export { logger, loggerLoader };