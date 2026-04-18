import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    cli: 'src/module/cli/cli.ts',
    lint_staged: 'src/lint_staged.ts'
  },
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  clean: true,
  minify: true
});