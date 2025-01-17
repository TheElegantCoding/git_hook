import elegantCoding from 'eslint-config-elegant-coding';

export default elegantCoding({
  html: true,
  ignore: [ 'postcss.config.cjs' ],
  json: true,
  jsxA11y: true,
  stylistic: true,
  typescript: true,
  yml: true
});