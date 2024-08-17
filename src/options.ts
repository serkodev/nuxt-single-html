export interface SingleHtmlOptions {
  /**
   * Enable single HTML mode when nuxt generate.
   * @default true
   */
  enabled: boolean

  /**
   * Specifies whether to delete inlined files after generating the single HTML file.
   * @default true
   */
  deleteInlinedFiles: boolean

  /**
   * The output filename for the generated single HTML file. You can use `[name]` to refer to the original HTML file name.
   * e.g. `[name].single.html` will output `index.single.html` for `index.html`.
   * @default "[name].html"
   */
  output: string
}
