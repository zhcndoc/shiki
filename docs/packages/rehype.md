---
outline: deep
---

# @shikijs/rehype

<Badges name="@shikijs/rehype" />

适用于 [rehype](https://github.com/rehypejs/rehype) 的 Shiki 插件。

## 安装

```bash
npm i -D @shikijs/rehype
```

## 使用方法

```ts twoslash
// @noErrors: true
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeShiki from '@shikijs/rehype'

const file = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeShiki, {
    // 也可以是只有单个主题的 `theme` 字段
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    }
  })
  .use(rehypeStringify)
  .process(await fs.readFile('./input.md'))
```

`@shikijs/rehype` 的默认导出使用 `getSingletonHighlighter` 中的 `shiki` 共享实例，该实例将在进程之间保持不变。如果您想要完全控制高亮器的生命周期，请改用[细粒度捆绑包 `@shikijs/rehype/core`](#fine-grained-bundle)。

## 细粒度捆绑

默认情况下会导入完整的 `shiki` 捆绑包。如果你使用了[细粒度捆绑](/guide/bundles#细粒度捆绑)，你可以从 `@shikijs/rehype/core` 中导入 `rehypeShikiFromHighlighter` 并传入你自己的高亮器：

```ts twoslash
// @noErrors: true
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeShikiFromHighlighter from '@shikijs/rehype/core'

import { createHighlighterCore } from 'shiki/core'

const highlighter = await createHighlighterCore({
  themes: [
    import('shiki/themes/vitesse-light.mjs')
  ],
  langs: [
    import('shiki/langs/javascript.mjs'),
  ],
  loadWasm: getWasm
})

const raw = await fs.readFile('./input.md')
const file = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeShikiFromHighlighter, highlighter, {
    // 也可以是只有单个主题的 `theme` 字段
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    }
  })
  .use(rehypeStringify)
  .processSync(raw) // 也可以同步处理
```

## 功能

### 行高亮

::: warning 警告
已废弃，在 `v0.10.0` 版本中已被默认禁用，并会在下一个次版本 (minor) 中移除。应该考虑使用 [`transformerNotationHighlight`](/packages/transformers#transformernotationhighlight)。
:::

除了支持 `shiki` 的功能以外，此插件还支持行的高亮。你可以以 `{<line-numbers>}` 的格式在代码块语言标注后指定你要高亮的行；以逗号分隔行号 (`<line-number>`)，并用大括号包裹。每一个行号可以是一个单独的数 (如 `{2}` 会高亮第 2 行，`{1,4}` 会高亮第 1 行和第 4 行)，或者指定一个范围 (如 `{5-7}` 会高亮第 5 到第 7 行，`{1-3,5-6}` 会高亮第 1 行到第 3 行，及第 5 行到第 6 行)。例如：

````md
```js {1,3-4}
console.log('1') // 高亮
console.log('2')
console.log('3') // 高亮
console.log('4') // 高亮
```
````

### Inline Code

You can also highlight inline codes with the `inline` option.

| Option                  | Example          | Description                                                 |
| ----------------------- | ---------------- | ----------------------------------------------------------- |
| `false`                 | -                | Disable inline code highlighting (default)                  |
| `'tailing-curly-colon'` | `let a = 1{:js}` | Highlight with a `{:language}` marker inside the code block |

Enable `inline` on the Rehype plugin:

```ts twoslash
// @noErrors: true
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeShiki from '@shikijs/rehype'

const file = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeShiki, {
    inline: 'tailing-curly-colon', // or other options
    // ...
  })
  .use(rehypeStringify)
  .process(await fs.readFile('./input.md'))
```

Then you can use inline code in markdown:

```md
This code `console.log("Hello World"){:js}` will be highlighted.
```
