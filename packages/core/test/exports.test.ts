import { fileURLToPath } from 'node:url'
import yaml from 'js-yaml'
import { expect, it } from 'vitest'
import { getPackageExportsManifest } from 'vitest-package-exports'

it('exports-snapshot', async () => {
  const manifest = await getPackageExportsManifest({
    importMode: 'src',
    cwd: fileURLToPath(import.meta.url),
  })
  expect(yaml.dump(manifest.exports)).toMatchInlineSnapshot(`
    ".:
      addClassToHast: function
      applyColorReplacements: function
      codeToHast: function
      codeToHtml: function
      codeToTokens: function
      codeToTokensBase: function
      codeToTokensWithThemes: function
      createCssVariablesTheme: function
      createdBundledHighlighter: function
      createHighlighterCore: function
      createHighlighterCoreSync: function
      createPositionConverter: function
      createShikiInternal: function
      createShikiInternalSync: function
      createSingletonShorthands: function
      enableDeprecationWarnings: function
      flatTokenVariants: function
      getSingletonHighlighterCore: function
      getTokenStyleObject: function
      guessEmbeddedLanguages: function
      hastToHtml: function
      isNoneTheme: function
      isPlainLang: function
      isSpecialLang: function
      isSpecialTheme: function
      makeSingletonHighlighter: function
      makeSingletonHighlighterCore: function
      normalizeGetter: function
      normalizeTheme: function
      resolveColorReplacements: function
      ShikiError: function
      splitLines: function
      splitToken: function
      splitTokens: function
      stringifyTokenStyle: function
      toArray: function
      tokenizeAnsiWithTheme: function
      tokenizeWithTheme: function
      tokensToHast: function
      transformerDecorations: function
      warnDeprecated: function
    ./textmate:
      disposeOnigString: function
      EncodedTokenMetadata: function
      FindOption: object
      FontStyle: object
      INITIAL: object
      Registry: function
      Theme: function
    "
  `)
})
