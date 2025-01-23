# @shikijs/markdown-it

<Badges name="@shikijs/markdown-it" />

适用于 [markdown-it](https://markdown-it.github.io/) 的 Shiki 插件。

## 安装

```bash
npm i -D @shikijs/markdown-it
```

## 使用方法

```ts twoslash
import Shiki from '@shikijs/markdown-it'
import MarkdownIt from 'markdown-it'

const md = MarkdownIt()

md.use(await Shiki({
  themes: {
    light: 'vitesse-light',
    dark: 'vitesse-dark',
  }
}))
```

## 细粒度捆绑

默认情况下会导入完整的 `shiki` 捆绑包。如果你使用了[细粒度捆绑](/guide/bundles#细粒度捆绑)，你可以从 `@shikijs/markdown-it/core` 中导入并传入你自己的高亮器：

```ts twoslash
// @noErrors: true
import { fromHighlighter } from '@shikijs/markdown-it/core'
import MarkdownIt from 'markdown-it'
import { createHighlighterCore } from 'shiki/core'

const highlighter = await createHighlighterCore({
  themes: [
    import('@shikijs/themes/vitesse-light')
  ],
  langs: [
    import('@shikijs/langs/javascript'),
  ],
  loadWasm: getWasm
})

const md = MarkdownIt()

md.use(fromHighlighter(highlighter, { /* 选项 */ }))
```

## With Shorthands

Shiki's [shorthands](/guide/shorthands) provides on-demand loading of themes and languages, but also makes the highlighting process asynchronous. Unfortunately, `markdown-it` itself [does NOT support async highlighting](https://github.com/markdown-it/markdown-it/blob/master/docs/development.md#i-need-async-rule-how-to-do-it) out of the box.

To workaround this, you can use [`markdown-it-async`](https://github.com/antfu/markdown-it-async) by [Anthony Fu](https://github.com/antfu). Where Shiki also provides an integration with it, you can import `fromAsyncCodeToHtml` from `@shikijs/markdown-it/async`.

````ts twoslash
import { fromAsyncCodeToHtml } from '@shikijs/markdown-it/async'
import MarkdownItAsync from 'markdown-it-async'
import { codeToHtml } from 'shiki' // Or your custom shorthand bundle

// Initialize MarkdownIt instance with markdown-it-async
const md = MarkdownItAsync()

md.use(
  fromAsyncCodeToHtml(
    // Pass the codeToHtml function
    codeToHtml,
    {
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      }
    }
  )
)

// Use `md.renderAsync` instead of `md.render`
const html = await md.renderAsync('# Title\n```ts\nconsole.log("Hello, World!")\n```')
````
