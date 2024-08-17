import { readdirSync, rmdirSync, statSync } from 'node:fs'
import { extname, join } from 'node:path'

export function findHtmlFiles(targetDir: string): string[] {
  const result: string[] = []

  function traverse(currentDir: string, relativePath: string = '') {
    const entries = readdirSync(currentDir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name)
      const entryRelativePath = join(relativePath, entry.name)

      if (entry.isDirectory()) {
        traverse(fullPath, entryRelativePath)
      }
      else if (entry.isFile() && extname(entry.name).toLowerCase() === '.html') {
        result.push(entryRelativePath)
      }
    }
  }

  traverse(targetDir)
  return result
}

// recursively scan directories and remove empty ones
export function removeEmptyDirectories(directory: string) {
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

export function replaceOutputFileName(path: string, output: string) {
  const pathParts = path.split('/')
  const fileName = pathParts[pathParts.length - 1]
  const fileNameParts = fileName.split('.')
  const name = fileNameParts.slice(0, -1).join('.')
  const newFileName = output.replace('[name]', name)

  pathParts[pathParts.length - 1] = newFileName
  return pathParts.join('/')
}
