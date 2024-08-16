import { join } from 'node:path'
import { readFileSync, readdirSync, rmdirSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import type { SingleHtmlOptions } from './options'

export function processInlineHtml(baseFolder: string, options: SingleHtmlOptions) {
  const { deleteInlinedFiles, entry, output = entry } = options

  const inlinedFiles: string[] = []

  function replaceStyleTags(htmlContent: string, baseDir: string) {
    const regex = /<link[^>]*rel="stylesheet"[^>]*href="\/([^"]*)"[^>]*>/g
    return htmlContent.replace(regex, (match, href) => {
      try {
        const filePath = join(baseDir, href)
        const contents = readFileSync(filePath, 'utf-8')
        inlinedFiles.push(filePath)
        return `<style>${contents}</style>`
      }
      catch {
        return match // Keep original tag if file not found
      }
    })
  }

  function replaceScriptTags(htmlContent: string, baseDir: string) {
    const regex = /<script(?:\s+type="([^"]*)")?\s+src="\/([^"]*)"[^>]*>[\s\S]*?<\/script>/g
    return htmlContent.replace(regex, (match, type, src) => {
      try {
        const filePath = join(baseDir, src)
        const contents = readFileSync(join(baseDir, src), 'utf-8')
        inlinedFiles.push(filePath)
        return `<script${type ? ` type="${type}"` : ''}>${contents}</script>`
      }
      catch {
        return match // Keep original tag if file not found
      }
    })
  }

  // Function to recursively scan directories and remove empty ones
  function removeEmptyDirectories(directory: string) {
    const files = readdirSync(directory)
    for (const file of files) {
      const fullPath = join(directory, file)
      if (statSync(fullPath).isDirectory()) {
        removeEmptyDirectories(fullPath)
        const isEmpty = readdirSync(fullPath).length === 0
        if (isEmpty) {
          rmdirSync(fullPath)
        }
      }
    }
  }

  try {
    console.log(`[single-html] Processing single html: ${entry}`)
    const filePath = join(baseFolder, entry)

    let html = readFileSync(filePath, 'utf-8')

    html = replaceStyleTags(html, baseFolder)
    html = replaceScriptTags(html, baseFolder)

    writeFileSync(join(baseFolder, output), html, 'utf-8')

    console.log(`[single-html] Processed and saved: ${output}`)

    // Remove original file if output is different
    if (entry !== output) {
      unlinkSync(filePath)
    }

    if (deleteInlinedFiles) {
      for (const file of inlinedFiles) {
        unlinkSync(file)
      }
      removeEmptyDirectories(baseFolder)

      console.log('[single-html] Deleted inlined files')
    }
  }
  catch (error) {
    console.error('[single-html] Error processing HTML files:', error)
  }
}
