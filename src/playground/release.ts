import { release } from '@src/module/release.js';
import { execSync } from 'node:child_process';

release();

execSync('git reset --soft HEAD~1');
execSync('git tag -d v1.0.0');