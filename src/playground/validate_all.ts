import { lintStaged } from '@src/lint_staged.js';
import { release } from '@src/module/release.js';
import { validateCommit } from '@src/module/validate_commit.js';

validateCommit();
lintStaged();
release();