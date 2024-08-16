# nuxt-single-html

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Build a Nuxt app into a single HTML file.

## Features

<!-- Highlight some of the features your module provide here -->
- 📄 &nbsp;Generates a fully self-contained HTML file for your Nuxt app.
- 🚀 &nbsp;Works out-of-the-box with zero configuration required for seamless setup.
- 📦 &nbsp;Supports inline JavaScript, CSS and images, etc.
- ⚡ &nbsp;SSG & SPA friendly, works with Nuxt Pages and multiple routes.
- 🛠️ &nbsp;Achieve single HTML file generation by adjusting Nuxt options, no additional dependencies required.

## Why?

TODO

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-single-html
```

That's it! You can build your Nuxt app into a single HTML now. ✨

```bash
npx nuxi generate
```

The generated HTML file would be output to `dist/index.html`.

## Configuration

TODO

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  pnpm install
  
  # Generate type stubs
  pnpm run dev:prepare
  
  # Develop with the playground
  pnpm run play
  
  # Build the playground with single-html module
  pnpm run play:generate
  
  # Run ESLint
  pnpm run lint
  
  # Release new version
  pnpm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-single-html/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-single-html

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-single-html.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/nuxt-single-html

[license-src]: https://img.shields.io/npm/l/nuxt-single-html.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-single-html

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
