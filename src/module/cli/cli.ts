#!/usr/bin/env node
/* eslint-disable no-console */
import { release } from '@src/module/release/release.js';
import { logger } from '@src/util/logger.js';

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
    🚀 Gitlys Toolkit
    Usage: gitlys [command]

    Commands:
      release    Analiza commits, genera changelog y sube a GitHub.
      --help     Muestra esta ayuda.
    `);
  process.exit(0);
}

if (args.includes('release')) {
  release();
} else {
  logger.error('Comando no reconocido. Prueba con: gitlys release');
}