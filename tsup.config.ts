import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    cli: 'src/module/cli/cli.ts',
    pre_commit_task: 'src/pre_commit_task.ts',
    pre_push_task: 'src/pre_push_task.ts'
  },
  format: ['esm'],
  dts: true,
  splitting: false,
  clean: true,
  minify: true
});