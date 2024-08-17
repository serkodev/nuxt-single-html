import { join } from 'node:path'
import { readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import type { SingleHtmlOptions } from './options'
import { findHtmlFiles, removeEmptyDirectories, replaceOutputFileName } from './utils'

export function processHtmlFiles(baseFolder: string, options: SingleHtmlOptions) {
  const { deleteInlinedFiles, output } = options

  try {
    const toRemoveFiles = new Set<string>()

    for (const entry of findHtmlFiles(baseFolder)) {
      const inlinedFiles = inlineFilesInHtml(baseFolder, entry, output)
      for (const file of inlinedFiles)
        toRemoveFiles.add(file)
    }

    if (deleteInlinedFiles) {
      console.log('[single-html] Deleting inlined files')
      for (const file of toRemoveFiles) {
        unlinkSync(file)
      }
      removeEmptyDirectories(baseFolder)
    }
  }
  catch (error) {
    console.error('[single-html] Error processing HTML files:', error)
  }
}

function inlineFilesInHtml(baseFolder: string, htmlPath: string, output: string) {
  const inlinedFiles: string[] = []

  function replaceStyleTags(htmlContent: string) {
    const regex = /<link[^>]*rel="stylesheet"[^>]*href="\/([^"]*)"[^>]*>/g
    return htmlContent.replace(regex, (match, href) => {
      try {
        const filePath = join(baseFolder, href)
        const contents = readFileSync(filePath, 'utf-8')
        inlinedFiles.push(filePath)
        return `<style>${contents}</style>`
      }
      catch {
        return match // Keep original tag if file not found
      }
    })
  }

  function replaceScriptTags(htmlContent: string) {
    const regex = /<script(?:\s+type="([^"]*)")?\s+src="\/([^"]*)"[^>]*>[\s\S]*?<\/script>/g
    return htmlContent.replace(regex, (match, type, src) => {
      try {
        const filePath = join(baseFolder, src)
        const contents = readFileSync(join(baseFolder, src), 'utf-8')
        inlinedFiles.push(filePath)
        return `<script${type ? ` type="${type}"` : ''}>${contents}</script>`
      }
      catch {
        return match // Keep original tag if file not found
      }
    })
  }

  const filePath = join(baseFolder, htmlPath)

  console.log(`[single-html] Processing single html: ${htmlPath}`)
  let html = readFileSync(filePath, 'utf-8')

  html = replaceStyleTags(html)
  html = replaceScriptTags(html)

  const outputPath = replaceOutputFileName(htmlPath, output)
  writeFileSync(join(baseFolder, outputPath), html, 'utf-8')

  // remove original html file if output is different
  if (outputPath !== htmlPath)
    unlinkSync(filePath)

  return inlinedFiles
}
