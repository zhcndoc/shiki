# @shikijs/markdown-it

<Badges name="@shikijs/markdown-it" />

Shiki 的 [markdown-it](https://markdown-it.github.io/) 插件。

## 安装

::: code-group

```sh [npm]
npm i -D @shikijs/markdown-it
```

```sh [yarn]
yarn add -D @shikijs/markdown-it
```

```sh [pnpm]
pnpm add -D @shikijs/markdown-it
```

```sh [bun]
bun add -D @shikijs/markdown-it
```

```sh [deno]
deno add npm:@shikijs/markdown-it
```

:::

## 使用

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
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

const highlighter = await createHighlighterCore({
  themes: [
    import('@shikijs/themes/vitesse-light')
  ],
  langs: [
    import('@shikijs/langs/javascript'),
  ],
  engine: createOnigurumaEngine(() => getWasm)
})

const md = MarkdownIt()

md.use(fromHighlighter(highlighter, { /* 选项 */ }))
```

## 使用简写

Shiki 的 [简写](/guide/shorthands) 提供按需加载主题和语言，但也使高亮过程变成异步。不幸的是，`markdown-it` 本身 [不支持异步高亮](https://github.com/markdown-it/markdown-it/blob/master/docs/development.md#i-need-async-rule-how-to-do-it) 默认情况下。

为了解决这个问题，您可以使用 [Anthony Fu](https://github.com/antfu) 的 [`markdown-it-async`](https://github.com/antfu/markdown-it-async)。Shiki 也提供与它的集成，您可以从 `@shikijs/markdown-it/async` 导入 `fromAsyncCodeToHtml`。

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

## Transformer Caveats

`markdown-it` defaults to enforcing `<pre><code>` as the outermost wrappers of code block html. If you use a custom Shiki [transformer](/guide/transformers), this behavior may be undesirable. For example, if the transformer produces

```html
<div class="fenced-code-block">
  <pre>
    <code>
      …
    </code>
  </pre>
</div>
```

the result after `markdown-it` processing will be

```html
<pre>
  <code>
    <div class="fenced-code-block">
      <pre>
        <code>
          …
        </code>
      </pre>
    </div>
  </code>
</pre>
```

Work around this by adding [olets/markdown-it-wrapperless-fence-rule](https://github.com/olets/markdown-it-wrapperless-fence-rule) to your `markdown-it` configuration, or by writing your own `markdown-it` fence rule (see [markdown-it#269](https://github.com/markdown-it/markdown-it/issues/269)).
