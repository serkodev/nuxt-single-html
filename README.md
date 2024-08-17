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
- 🧩 &nbsp;Achieve single HTML file generation by adjusting Nuxt config within a Nuxt module, no additional dependencies required.

## Why?

For most websites, bundling your entire web application into a single file is generally NOT RECOMMENDED. However, in certain scenarios, this can be useful, such as:

-	Integrating your web app within desktop or mobile WebView components
-	Deploying your web app to environments with strict access requirements
-	Embedding your web app in embedded devices

In these special cases, `nuxt-single-html` allows you to leverage the powerful development experience of Nuxt while easily bundling your web app into a single HTML file, even supporting page pre-rendering.

This module is specifically designed to work with Nuxt. If you are looking for a similar solution for other frameworks, consider using [vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile).

## Quickstart

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-single-html
```

<details>
  <summary>Install manually</summary>

  ```sh
  npm i -D nuxt-single-html
  ```

  ```ts
  // nuxt.config.ts
  export default defineNuxtConfig({
    modules: ['nuxt-single-html']
  })
  ```
</details>

### Generate single HTML

After installing, you can now build your Nuxt app into a single HTML now, no configuration required. Since [`nuxi build`](https://nuxt.com/docs/api/commands/build) does not prerender HTML files by default, you need to use [`nuxi generate`](https://nuxt.com/docs/api/commands/generate) to generate the HTML files.

```bash
npx nuxi generate
```

The HTML file output path depends on your ([`nitro.output.publicDir`](https://nitro.unjs.io/config#output)) Nuxt configuration. By default, it will be placed in the `.output/public` directory.

## Configuration

You can define these options in your `nuxt.config.js` file under the `singleHtml` key.

#### Example Configuration:

```javascript
export default {
  modules: [
    'nuxt-single-html'
  ],
  singleHtml: {
    enabled: true,
    deleteInlinedFiles: true,
    output: '[name].html'
  }
}
```

#### Options:

- **`enabled`** (boolean)  
  - **Description:** Enables or disables the single HTML mode when running the `nuxt generate` command.
  - **Default:** `true`

- **`deleteInlinedFiles`** (boolean)  
  - **Description:** Specifies whether to delete inlined files after generating the single HTML file.
  - **Default:** `true`

- **`output`** (string)  
  - **Description:** The output filename for the generated single HTML file. You can use `[name]` to refer to the original HTML file name. 
  - **Default:** `'[name].html'`

## FAQ

### How are the assets built?

All assets (images, fonts, CSS, etc.) inside the [`assets/`](https://nuxt.com/docs/guide/directory-structure/assets) directory will be inlined into the single HTML file. However, assets inside the [`public/`](https://nuxt.com/docs/guide/directory-structure/public) directory will not be inlined. For more details, please refer to the [Nuxt Assets](https://nuxt.com/docs/getting-started/assets) documentation.

### Why are multiple HTML files generated?

If you’re using Nuxt Pages, multiple single HTML files may be generated for each route. Each HTML file contains the full source code for all route pages, meaning they can operate independently and still support SPA behavior. The only difference is that each HTML file is pre-rendered for its corresponding route.

Simply put, if you only need `index.html` as your entry point, you can deploy just the `index.html` and able to safely ignore the other HTML files. You can also check out config [memory history mode](https://nuxt.com/docs/guide/recipes/custom-routing#custom-history-advanced) to fit your needs.

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  pnpm install
  
  # Generate type stubs
  pnpm dev:prepare
  
  # Develop with the playground
  pnpm play
  
  # Build and preview the playground with single-html module
  pnpm play:generate
  pnpm play:preview
  
  # Run ESLint
  pnpm lint
  pnpm lint:fix
  
  # Release new version
  pnpm release
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
