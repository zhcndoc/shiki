# @shikijs/markdown-it

<Badges name="@shikijs/markdown-it" />

适用于 [markdown-it](https://markdown-it.github.io/) 的 Shiki 插件。

## 安装

```bash
npm i -D @shikijs/markdown-it
```

## 使用方法

```ts twoslash
import MarkdownIt from 'markdown-it'
import Shiki from '@shikijs/markdown-it'

const md = MarkdownIt()

md.use(await Shiki({
  themes: {
    light: 'vitesse-light',
    dark: 'vitesse-dark',
  }
}))
```

## 细粒度捆绑

默认情况下会导入完整的 `shiki` 捆绑包。如果你使用了[细粒度捆绑](/guide/install#细粒度捆绑)，你可以从 `@shikijs/markdown-it/core` 中导入并传入你自己的高亮器：

```ts twoslash
// @noErrors: true
import MarkdownIt from 'markdown-it'
import { fromHighlighter } from '@shikijs/markdown-it/core'
import { getHighlighterCore } from 'shiki/core'
import getWasm from 'shiki/wasm'

const highlighter = await getHighlighterCore({
  themes: [
    import('shiki/themes/vitesse-light.mjs')
  ],
  langs: [
    import('shiki/langs/javascript.mjs'),
  ],
  loadWasm: getWasm
})

const md = MarkdownIt()

md.use(fromHighlighter(highlighter, { /* 选项 */ }))
```

## 功能

### 行高亮

::: warning 警告
已废弃，在 `v1.0` 版本中已被默认禁用，并会在下一个次版本 (minor) 中移除。应该考虑使用 [`transformerNotationHighlight`](/packages/transformers#transformernotationhighlight)。
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

::: info 注意
如果高亮器不工作，这可能是因为 [markdown-it-attrs](https://github.com/arve0/markdown-it-attrs) 插件的兼容性问题。`markdown-it-attrs` 使用了和本插件相同的大括号 (`{}`) 语法，使得高亮器无法正常工作。如果你想要同时使用 `markdown-it-attrs` 和本插件，考虑更改 `markdown-it-attrs` 的[分隔符 / 语法](https://github.com/arve0/markdown-it-attrs#custom-delimiters)来使用另外的字符，例如 `%`。
:::
