<img src="./.github/asset/illustration/wave_header.svg" alt="wave" width="100%" />

<h1 align="center">
  <img src="./.github/asset/icon/git.svg" width="28px"  />
  Gitlys
</h1>

<br />

<img 
  src="./.github/asset/illustration/divider.svg" 
  alt="divider" 
  width="100%" 
/>

<pre align="center">
  <a href="#installation">📦 SETUP</a> • <a href="#configuration">⚙️ CONFIGURATION</a> • <a href="#features">⚡ FEATURES</a> 
</pre>

<img 
  src="./.github/asset/illustration/divider.svg" 
  alt="divider" 
  width="100%" 
/>

<img src="./.github/asset/illustration/gitlys_cover.svg" width="100%" />

<br />

<div align="center">
  <img src="./.github/asset/illustration/bun_badged.svg" height="34px" />&nbsp;&nbsp;&nbsp;
  <img src="./.github/asset/illustration/github_badged.svg" height="34px" />&nbsp;&nbsp;&nbsp;
  <img src="./.github/asset/illustration/typescript_badged.svg" height="34px" />&nbsp;&nbsp;&nbsp;
  <img src="./.github/asset/illustration/node_badged.svg" height="34px" />&nbsp;&nbsp;&nbsp;
  <img src="./.github/asset/illustration/npm_badged.svg" height="34px" />&nbsp;&nbsp;&nbsp;
  <img src="./.github/asset/illustration/git_badged.svg" height="34px" />
</div>

<img 
  src="./.github/asset/illustration/divider.svg" 
  alt="divider" 
  width="100%" 
/>

<h2 id="about">
  <img src="./.github/asset/icon/information.svg" width="24px" align="center"/>
  About
</h2>

<table border="0">
<tr>
<td>
The ultimate Git workflow toolkit for Node and Bun. Orchestrate your entire release cycle: from linting staged files and enforcing commit standards to automated semantic versioning and GitHub releases.
</td>
</tr>
</table>

<br />

<img 
  src="./.github/asset/illustration/divider.svg" 
  alt="divider" 
  width="100%" 
/>

<h2 id="table-of-content">
  <img src="./.github/asset/icon/book.svg" width="24px" align="center"/>
  Table of content
</h2>

- [<img src="./.github/asset/icon/information.svg" width="16px" align="center" /> About](#about)
- [<img src="./.github/asset/icon/thunder.svg" width="16px" align="center" /> Requirements](#requirements)
- [<img src="./.github/asset/icon/package.svg" width="16px" align="center" /> Installation](#installation)
- [<img src="./.github/asset/icon/rocket.svg" width="16px" align="center" /> Usage](#usage)
- [<img src="./.github/asset/icon/gear.svg" width="16px" align="center" /> Configuration](#configuration)

<img 
  src="./.github/asset/illustration/divider.svg" 
  alt="divider" 
  width="100%" 
/>

<h2 id="requirements">
  <img src="./.github/asset/icon/thunder.svg" width="24px" align="center"/>
  Requirements
</h2>

- <img src="./.github/asset/icon/node.svg" width="20px" align="center" /> node >= **22.17.0**
- <img src="./.github/asset/icon/bun.svg" width="20px" align="center" /> bun >= **1.1.0**
- <img src="./.github/asset/icon/github.svg" width="20px" align="center" /> github cli >= **2.89.0**

<br />

<img 
  src="./.github/asset/illustration/divider.svg" 
  alt="divider" 
  width="100%" 
/>

<h1 id="installation">
  <img src="./.github/asset/icon/package.svg" width="24px" align="center" />
  Installation
</h1>

<h3><img src="./.github/asset/icon/bun.svg" width="24px" align="center" /> Bun</h3>

```bash
bun i -D gitlys
```

<h3><img src="./.github/asset/icon/npm.svg" width="24px" align="center" /> Npm</h3>

```bash
npm i -D gitlys
```

<h3><img src="./.github/asset/icon/pnpm.svg" width="24px" align="center" /> Pnpm</h3>

```bash
pnpm i -D logginlys
```

<h3><img src="./.github/asset/icon/yarn.svg" width="24px" align="center" /> Yarn</h3>

```bash
yarn i -D logginlys
```

<br />

<img 
  src="./.github/asset/illustration/divider.svg" 
  alt="divider" 
  width="100%" 
/>

<h2 id="features">
  <img src="./.github/asset/icon/satellite.svg" width="24px" align="center" />
  Features
</h2>

- <img src="./.github/asset/icon/check.svg" width="18px" align="center" /> `Commitlint` - Enforce commit message standards
- <img src="./.github/asset/icon/check.svg" width="18px" align="center" /> `Lint-staged` - Lint staged files before commit
- <img src="./.github/asset/icon/check.svg" width="18px" align="center" /> `Changelog` - Generate and maintain a changelog
- <img src="./.github/asset/icon/check.svg" width="18px" align="center" /> `Semantic Release` - Automated semantic versioning and changelog generation
- <img src="./.github/asset/icon/check.svg" width="18px" align="center" /> `GitHub Release` - Automatically create releases on GitHub with the generated changelog
- <img src="./.github/asset/icon/check.svg" width="18px" align="center" /> `Customizable` - Highly customizable to fit your workflow

<br />

<img 
  src="./.github/asset/illustration/divider.svg" 
  alt="divider" 
  width="100%" 
/>

<h2 id="usage">
  <img src="./.github/asset/icon/rocket.svg" width="24px" align="center" />
  Usage
</h2>

To initialize gitlys in your project, just run the following command in your terminal, you can use the package manager you want:

```bash
bunx gitlys init
```

In order to release a version of your project, just run the following command in your terminal:

```bash
bunx gitlys release
```

I recommend you to add this command in your `package.json` for more comfortable use:

```json
{
  "scripts": {
    "postinstall": "bunx gitlys init",
    "release": "bunx gitlys release",
    "prepublishOnly": "bun run build",
  }
}
```

<br />

<img 
  src="./.github/asset/illustration/divider.svg" 
  alt="divider" 
  width="100%" 
/>

<h2 id="configuration">
  <img src="./.github/asset/icon/gear.svg" width="24px" align="center" />
  Configuration
</h2>

The configuration of gitlys is really simple, create a file named `.gitlys.json` in the root of your project and export an object with the configuration you want, for example:

```json
{
  "commitlint": {
    "allowedTypes": ["feat", "fix", "docs", "style", "refactor", "perf", "test", "chore"],
    "maxLength": 120
  },
  "lintStaged": {
    "*.{ts,tsx,js,jsx}": "eslint --fix",
    "*.{css,scss}": "stylelint --fix"
  },
  "release": {
    "releaseToGithub": false
  },
  "changelog": {
    "changelogPath": "CHANGELOG.md",
    "generateChangelog": false
  },
  "packageManager": "npm"
}
```

- `commitlint.allowedTypes` - Allowed types for commit messages, by default it uses the conventional commits types
- `commitlint.maxLength` - Maximum length for commit messages
- `lintStaged` - Configuration for lint-staged, files and commands to run when those files are staged
- `release.releaseToGithub` - Configuration for release, whether to release to GitHub or not
- `changelog.changelogPath` - Path to the changelog file
- `changelog.generateChangelog` - Whether to generate a changelog or not
- `packageManager` - Package manager to use for install gitlys and run scripts

<br />

<img 
  src="./.github/asset/illustration/divider.svg" 
  alt="divider" 
  width="100%" 
/>

<pre align="center">
  <a href="#top">BACK TO TOP</a>
</pre>

<img 
  src="./.github/asset/illustration/divider.svg" 
  alt="divider" 
  width="100%" 
/>

<pre align="center">
  Copyright © All rights reserved,
  developed by LuisdaByte and
</pre>
<div align="center">
  <img src="./.github/asset/illustration/astralys_logo.svg" width="120px" align="center" />
</div>

<img src="./.github/asset/illustration/wave_footer.svg" width="100%" />