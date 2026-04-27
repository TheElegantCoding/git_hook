import eslintConfig from 'eslint-config-universal-code';

const config = eslintConfig({
  json: true,
  stylistic: true,
  unicorn: true,
  yml: true,
  html: true,
  perfectionist: true,
  typescript: true
}, {
  rules: {
    'unicorn/no-process-exit': 'off',
    'max-statements': ['error', 20]
  }
});

export default config;