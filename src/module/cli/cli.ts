#!/usr/bin/env node
/* eslint-disable ts/switch-exhaustiveness-check */
/* eslint-disable no-console */
import { release } from '@src/module/release/release.js';
import { init } from '@src/util/install.js';
import { logger } from '@src/util/logger.js';

const args = process.argv.slice(2);
const command = args[0];

const helpMenu = `
    🚀 Gitlys Toolkit
    Usage: gitlys [command] [options]

    Commands:
      init         Config Gitlys in your repository.
      release      Analyze commits and generate release.
      --help       Show this help.
`;

if (args.includes('--help') || args.includes('-h')) {
  console.log(helpMenu);
  process.exit(0);
}

switch (command) {
  case 'init': {
    init();
    break;
  }
  case 'release': {
    await release();
    break;
  }
  default: {
    logger.error('Command not recognized. Use --help for available commands.');
    process.exit(1);
  }
}