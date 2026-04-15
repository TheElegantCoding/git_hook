import { iconFile } from '@src/constant/icon_file.js';
import { colorAnsi } from 'logginlys';

const fileStyle = {
  ts: {
    color: colorAnsi.blue,
    icon: iconFile.ts
  },
  js: {
    color: colorAnsi.yellow,
    icon: iconFile.js
  },
  json: {
    color: colorAnsi.yellow,
    icon: iconFile.json
  },
  yaml: {
    color: colorAnsi.red,
    icon: iconFile.yaml
  },
  yml: {
    color: colorAnsi.red,
    icon: iconFile.yaml
  },
  html: {
    color: '\u001b[38;5;208m',
    icon: iconFile.html
  },
  tsx: {
    color: colorAnsi.blue,
    icon: iconFile.tsx
  },
  jsx: {
    color: colorAnsi.yellow,
    icon: iconFile.jsx
  },
  css: {
    color: colorAnsi.blue,
    icon: iconFile.css
  },
  scss: {
    color: '\u001b[38;5;198m',
    icon: iconFile.scss
  },
  astro: {
    color: '\u001b[38;5;202m',
    icon: iconFile.astro
  },
  tf: {
    color: colorAnsi.purple,
    icon: iconFile.tf
  },
  tfvars: {
    color: colorAnsi.purple,
    icon: iconFile.tfvars
  },
  default: {
    color: colorAnsi.gray,
    icon: iconFile.file
  }
};

export { fileStyle };