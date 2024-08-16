import { defineNuxtModule } from '@nuxt/kit'
import { processInlineHtml } from './inlineHtml'
import type { SingleHtmlOptions } from './options'

export default defineNuxtModule<SingleHtmlOptions>({
  meta: {
    name: 'single-html',
    configKey: 'singleHtml',
  },
  defaults: {
    enabled: true,
    deleteInlinedFiles: true,
    entry: 'index.html',
    entryRoute: '/',
  },
  setup(options, nuxt) {
    // only run when nuxi generate
    const isPrerender = nuxt.options.nitro.static
    if (!isPrerender || !options.enabled)
      return

    // remove /_nuxt/builds folder
    nuxt.options.experimental.appManifest = false

    // disable payload file
    nuxt.options.experimental.payloadExtraction = false

    // disable css code splitting
    nuxt.options.vite.build ||= {}
    nuxt.options.vite.build.cssCodeSplit = false

    // unlimit inline assets (e.g. images)
    nuxt.options.vite.build.assetsInlineLimit = Number.MAX_SAFE_INTEGER

    // disable js code splitting
    ;(nuxt.options.vite.build.rollupOptions ||= {}).output ||= {}
    if (Array.isArray(nuxt.options.vite.build.rollupOptions.output)) {
      nuxt.options.vite.build.rollupOptions.output.forEach((output) => {
        output.inlineDynamicImports = true
      })
    }
    else {
      nuxt.options.vite.build.rollupOptions.output.inlineDynamicImports = true
    }

    // ignore 200.html and 404.html
    nuxt.options.nitro.prerender ||= {}
    ;(nuxt.options.nitro.prerender.ignore ||= []).push('/200.html', '/404.html')

    // skip prerender for routes other than entryRoute
    nuxt.hook('nitro:init', (nitro) => {
      nitro.hooks.hook('prerender:generate', (route) => {
        if (route.route !== options.entryRoute)
          route.skip = true
      })
    })

    // remove prefetch and preload
    nuxt.hook('build:manifest', (manifest) => {
      for (const key in manifest) {
        manifest[key].dynamicImports = []
        manifest[key].prefetch = false
        manifest[key].preload = false
      }
    })

    // process entry html to replace inline js and css after prerender
    nuxt.hook('nitro:build:public-assets', (nitro) => {
      const dir = nitro.options.output.publicDir
      processInlineHtml(dir, options)
    })
  },
})
