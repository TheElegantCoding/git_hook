import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/module/cli/cli.ts',
    'src/util/install.ts'
  ],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  minify: true
});