# @shikijs/markdown-exit

<Badges name="@shikijs/markdown-exit" />

[markdown-exit](https://github.com/serkodev/markdown-exit) 是 Shiki 的插件。

`markdown-exit` 是对 `markdown-it` 的现代 TypeScript 重写，支持原生异步渲染 — 异步高亮无需额外库。

## 安装

::: code-group

```sh [npm]
npm i -D @shikijs/markdown-exit
```

```sh [yarn]
yarn add -D @shikijs/markdown-exit
```

```sh [pnpm]
pnpm add -D @shikijs/markdown-exit
```

```sh [bun]
bun add -D @shikijs/markdown-exit
```

```sh [deno]
deno add npm:@shikijs/markdown-exit
```

:::

## 使用方法

默认导出使用 Shiki 的[简写](/guide/shorthands)来按需加载主题和语言。由于高亮是异步的，请使用 `md.renderAsync()` 进行渲染：

````ts
import Shiki from '@shikijs/markdown-exit'
import { createMarkdownExit } from 'markdown-exit'

const md = createMarkdownExit()

md.use(Shiki({
  themes: {
    light: 'vitesse-light',
    dark: 'vitesse-dark',
  }
}))

// 使用 `md.renderAsync` 代替 `md.render`
const html = await md.renderAsync('# Title\n```ts\nconsole.log("Hello, World!")\n```')
````

## 转换器

你可以向插件选项传入[转换器](/guide/transformers)以自定义高亮代码。

```ts
import Shiki from '@shikijs/markdown-exit'
import { transformerNotationDiff } from '@shikijs/transformers'
import { createMarkdownExit } from 'markdown-exit'

const md = createMarkdownExit()

md.use(Shiki({
  themes: {
    light: 'vitesse-light',
    dark: 'vitesse-dark',
  },
  transformers: [
    transformerNotationDiff(),
  ],
}))

const html = await md.renderAsync(md_string)
```

## 自定义 `codeToHtml`

如果你有自定义的 `codeToHtml` 函数（例如，来自细粒度简写包），可以使用 `fromAsyncCodeToHtml`：

````ts
import { fromAsyncCodeToHtml } from '@shikijs/markdown-exit'
import { createMarkdownExit } from 'markdown-exit'
import { codeToHtml } from 'shiki' // 或你的自定义简写包

const md = createMarkdownExit()

md.use(
  fromAsyncCodeToHtml(
    codeToHtml,
    {
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      }
    }
  )
)

// 使用 `md.renderAsync` 代替 `md.render`
const html = await md.renderAsync('# Title\n```ts\nconsole.log("Hello, World!")\n```')
````

## 细粒度包

默认情况会导入 `shiki` 的完整包。如果你使用[细粒度包](/guide/bundles#fine-grained-bundle)，你可以从 `@shikijs/markdown-exit/core` 导入并传入你自己的高亮器：

```ts
import { fromHighlighter } from '@shikijs/markdown-exit/core'
import { createMarkdownExit } from 'markdown-exit'
import { createHighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

const highlighter = await createHighlighterCore({
  themes: [
    import('@shikijs/themes/vitesse-light')
  ],
  langs: [
    import('@shikijs/langs/javascript'),
  ],
  engine: createOnigurumaEngine(() => import('shiki/wasm'))
})

const md = createMarkdownExit()

md.use(fromHighlighter(highlighter, { /* options */ }))
```
