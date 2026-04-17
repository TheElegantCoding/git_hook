#!/usr/bin/env node
/* eslint-disable ts/switch-exhaustiveness-check */
/* eslint-disable no-console */
import { release } from '@src/module/release/release.js';
import { init } from '@src/util/install.js';
import { logger } from '@src/util/logger.js';

const args = process.argv.slice(2);
const command = args[0];

const isMajor = args.includes('--major');
const isMinor = args.includes('--minor');
const isPatch = args.includes('--patch');

const helpMenu = `
    🚀 Gitlys Toolkit
    Usage: gitlys [command] [options]

    Commands:
      init          Config Gitlys in your repository.
      release       Analyze commits and generate release.
        --major     Force a MAJOR version increment.
        --minor     Force a MINOR version increment.
        --patch     Force a PATCH version increment.
      --help        Show this help.
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
    let bumpType;
    if (isMajor) { bumpType = 'major'; }
    if (isMinor) { bumpType = 'minor'; }
    if (isPatch) { bumpType = 'patch'; }

    release(bumpType);
    break;
  }
  default: {
    logger.error('Command not recognized. Use --help for available commands.');
    process.exit(1);
  }
}