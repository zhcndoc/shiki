---
outline: deep
---

# 捆绑包

主要的 `shiki` 包入点通过动态导入捆绑了所有支持的主题和语言。大多数情况下，效率应该不成问题，因为语法只有在需要时才会被导入或下载。然而，当你将 shiki 捆绑到浏览器运行时或 Web Worker 中时，即使这些文件没有被导入，它们仍然会增加你的分发大小。我们提供了[细粒度捆绑](/guide/install#细粒度捆绑)以帮助你根据需要逐个组合语言和主题。

## Bundle 预设

方便起见，我们还提供了一些预制的捆绑包供你使用。

### `shiki/bundle/full`

> [捆绑包大小](/guide/#捆绑包大小)：6.4 MB (minified)，1.3 MB (gzip)，包含异步块

与 `shiki` 相同，这个捆绑包捆绑了所有的主题和语言。

### `shiki/bundle/web`

> [捆绑包大小](/guide/#捆绑包大小)：4.2 MB (minified)，748 KB (gzip)，包含异步块

这个捆绑包捆绑了所有的主题和一些常见的 Web 语言 (例如 HTML，CSS，JS，TS，JSON 和 Markdown 等) 以及一些框架语法 (例如 Vue，JSX 和 Svelte 等) 的支持。

该捆绑包中可以使用 `shiki` 的所有功能。

```ts twoslash
import {
  BundledLanguage,
  BundledTheme,
  codeToHtml,
  createHighlighter
} from 'shiki/bundle/web' // [!code highlight]

const highlighter = await createHighlighter({
  langs: ['html', 'css', 'js'],
  themes: ['github-dark', 'github-light'],
})
```

## Fine-grained Bundle

When importing `shiki`, all the themes and languages are bundled as async chunks. Normally it won't be a concern to you as they are not being loaded if you don't use them. In some cases, if you want to control what to bundle, you can use the core and compose your own bundle.

```ts twoslash
// @noErrors
// `shiki/core` entry does not include any themes or languages or the wasm binary.
import { createHighlighterCore } from 'shiki/core'

// directly import the theme and language modules, only the ones you imported will be bundled.
import nord from 'shiki/themes/nord.mjs'

const highlighter = await createHighlighterCore({
  themes: [
    // instead of strings, you need to pass the imported module
    nord,
    // or a dynamic import if you want to do chunk splitting
    import('shiki/themes/material-theme-ocean.mjs')
  ],
  langs: [
    import('shiki/langs/javascript.mjs'),
    // shiki will try to interop the module with the default export
    () => import('shiki/langs/css.mjs'),
    // or a getter that returns custom grammar
    async () => JSON.parse(await fs.readFile('my-grammar.json', 'utf-8'))
  ],
  // `shiki/wasm` contains the wasm binary inlined as base64 string.
  engine: createWasmOnigEngine(import('shiki/wasm'))
})

// optionally, load themes and languages after creation
await highlighter.loadTheme(import('shiki/themes/vitesse-light.mjs'))

const code = highlighter.codeToHtml('const a = 1', {
  lang: 'javascript',
  theme: 'material-theme-ocean'
})
```

::: info
[Shorthands](/guide/install#shorthands) are only avaliable in bundle presets. For a fine-grained bundle, you can create your own shorthands using [`createSingletonShorthands`](https://github.com/shikijs/shiki/blob/main/packages/core/src/constructors/bundle-factory.ts#L203) or port it yourself.
:::
