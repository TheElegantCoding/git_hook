import { logger } from '@src/util/logger.js';
import { icon, colorAnsi } from 'logginlys';

const loader = (message: string) => {
  const badget = `${colorAnsi.bgBlue} ${icon.info} INFO ${colorAnsi.reset}`;
  const loaderInstance = logger.loader({
    message: `${badget} ${message}`,
    position: 'right',
    showTimestamp: true
  });

  return loaderInstance;
};

const finalMessage = (message: string) => {
  const badget = `${colorAnsi.bgGreen} ${icon.check} SUCCESS ${colorAnsi.reset}`;

  return `${badget} ${message}`;
};

export { loader, finalMessage };