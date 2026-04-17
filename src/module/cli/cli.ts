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
    Usage: gitlys [command]

    Commands:
      init          Configura Gitlys en el repo (Hooks y Config).
      lint-staged   Ejecuta validaciones en archivos preparados.
      release       Analiza commits, genera changelog y sube a GitHub.
      --help        Muestra esta ayuda.
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
    release();
    break;
  }
  default: {
    logger.error('Command not recognized. Use --help for available commands.');
    process.exit(1);
  }
}