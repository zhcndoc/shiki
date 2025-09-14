# 主题颜色控制

## 多种颜色值支持

通常，TextMate 主题要求标签的颜色值是有效的十六进制颜色值，这个限制来自于 [`vscode-textmate`](https://github.com/microsoft/vscode-textmate)。然而，在 shiki v1.0 中，我们引入了一个自动解决的方法，通过用占位符替换非十六进制颜色值，并在标签化时将其替换回来。这样可以让你使用具有多种颜色值的主题进行渲染，而不必担心其技术细节：

```ts twoslash
// @twoslash-cache: {"v":1,"hash":"5f9463cf8a4fa8c2fc3bdfefe2cba8fb5e867938d104c32e0686f0bcade34c1f","data":"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="}
import { createHighlighter } from 'shiki'

const highlighter = await createHighlighter({
  langs: ['javascript'],
  themes: [
    {
      name: 'my-theme',
      settings: [
        {
          scope: ['comment'],
          settings: {
            // 使用 `rgb`、`hsl`、`hsla`，// [!code hl:3]
            // 或者任何你的渲染器支持的颜色。
            foreground: 'rgb(128, 128, 128)'
          }
        },
        {
          scope: ['string'],
          settings: {
            foreground: 'var(--code-string)' // CSS 变量 // [!code hl:1]
          }
        },
        // 更多
      ],
      // 背景和前景颜色 // [!code hl:3]
      bg: 'var(--code-bg)',
      fg: 'var(--code-fg)'
    }
  ]
})

const html = highlighter.codeToHtml('const foo = "bar"', { lang: 'javascript', theme: 'my-theme' })
```

::: info 注意
谨慎使用，这将与 TextMate 主题不兼容。

这也可能会使主题与非 Web 用例不兼容，例如 [`shiki-cli`](/packages/cli) 和 [`shiki-monaco`](/packages/monaco)。
:::

了解如何[载入主题](./load-theme)。

## 颜色替换

你还可以使用 `colorReplacements` 选项来替换主题的颜色值。它在你想要使用具有不同颜色的主题时非常有用。它在主题对象、`codeToHast` 以及 `codeToHtml` 的选项上可用。

`colorReplacements` 对象需要符合颜色与颜色一对一的形式，键是你想要替换的原颜色，值是新的颜色：

```js
const html = await codeToHtml(
  code,
  {
    lang: 'js',
    theme: 'min-dark',
    colorReplacements: {
      '#ff79c6': '#189eff'
    }
  }
)
```

此外，`colorReplacements` 可以包含制定作用域的替换。对于多主题的情况下，这样可以很方便的替换指定主题的颜色：

```js
const html = await codeToHtml(
  code,
  {
    lang: 'js',
    themes: { dark: 'min-dark', light: 'min-light' },
    colorReplacements: {
      'min-dark': {
        '#ff79c6': '#189eff'
      },
      'min-light': {
        '#ff79c6': '#defdef'
      }
    }
  }
)
```

该选项只在 `colorReplacements` 上可用，在主题对象上则不可用。

## CSS 变量主题

shiki 提供了一个工厂函数助手 (Factory Function Helper) `createCssVariablesTheme`，用于更方便地创建使用 CSS 变量的主题。请注意，这个主题形式比大多数其他主题的细粒度要低，并且需要在你的应用程序中定义 CSS 变量。这是为了更方便地从 Shiki 的 [`css-variables` 主题](https://github.com/shikijs/shiki/blob/main/docs/themes.md#theming-with-css-variables)迁移而提供的。但为了更好的显示效果，我们建议使用[多种颜色值支持](#多种颜色值支持)或[颜色替换](#颜色替换)来覆盖现有的主题。

此主题形式**不包含在默认设置**中，必须显式注册：

```ts twoslash
// @twoslash-cache: {"v":1,"hash":"fe07380c30b7a9fd6c0b983c1c405ffb3738fe956c918b1ec1f90bd683114cb2","data":"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"}
import { createHighlighter } from 'shiki'
import { createCssVariablesTheme } from 'shiki/core'

// 创建一个自定义的 CSS 变量主题，以下是默认值。
const myTheme = createCssVariablesTheme({ // [!code hl:6]
  name: 'css-variables',
  variablePrefix: '--shiki-',
  variableDefaults: {},
  fontStyle: true
})

const highlighter = await createHighlighter({
  langs: ['javascript'],
  themes: [myTheme] // 注册主题 // [!code hl]
})

const html = highlighter.codeToHtml('const foo = "bar"', {
  lang: 'javascript',
  theme: 'css-variables' // 使用主题 // [!code hl]
})
```

CSS 变量的示例如下：

```css
:root {
  --shiki-foreground: #eeeeee;
  --shiki-background: #333333;
  --shiki-token-constant: #660000;
  --shiki-token-string: #770000;
  --shiki-token-comment: #880000;
  --shiki-token-keyword: #990000;
  --shiki-token-parameter: #aa0000;
  --shiki-token-function: #bb0000;
  --shiki-token-string-expression: #cc0000;
  --shiki-token-punctuation: #dd0000;
  --shiki-token-link: #ee0000;

  /* Only required if using lang: 'ansi' */
  --shiki-ansi-black: #000000;
  --shiki-ansi-black-dim: #00000080;
  --shiki-ansi-red: #bb0000;
  --shiki-ansi-red-dim: #bb000080;
  --shiki-ansi-green: #00bb00;
  --shiki-ansi-green-dim: #00bb0080;
  --shiki-ansi-yellow: #bbbb00;
  --shiki-ansi-yellow-dim: #bbbb0080;
  --shiki-ansi-blue: #0000bb;
  --shiki-ansi-blue-dim: #0000bb80;
  --shiki-ansi-magenta: #ff00ff;
  --shiki-ansi-magenta-dim: #ff00ff80;
  --shiki-ansi-cyan: #00bbbb;
  --shiki-ansi-cyan-dim: #00bbbb80;
  --shiki-ansi-white: #eeeeee;
  --shiki-ansi-white-dim: #eeeeee80;
  --shiki-ansi-bright-black: #555555;
  --shiki-ansi-bright-black-dim: #55555580;
  --shiki-ansi-bright-red: #ff5555;
  --shiki-ansi-bright-red-dim: #ff555580;
  --shiki-ansi-bright-green: #00ff00;
  --shiki-ansi-bright-green-dim: #00ff0080;
  --shiki-ansi-bright-yellow: #ffff55;
  --shiki-ansi-bright-yellow-dim: #ffff5580;
  --shiki-ansi-bright-blue: #5555ff;
  --shiki-ansi-bright-blue-dim: #5555ff80;
  --shiki-ansi-bright-magenta: #ff55ff;
  --shiki-ansi-bright-magenta-dim: #ff55ff80;
  --shiki-ansi-bright-cyan: #55ffff;
  --shiki-ansi-bright-cyan-dim: #55ffff80;
  --shiki-ansi-bright-white: #ffffff;
  --shiki-ansi-bright-white-dim: #ffffff80;
}
```

如果你是从 Shiki 的 v0 版本迁移来的，以下是一些对 Shiki 的 `css-variables` 条目的更名供你参考：

| Shiki v0                   | Shiki v1.0           |
| -------------------------- | -------------------- |
| `--shiki-color-text`       | `--shiki-foreground` |
| `--shiki-color-background` | `--shiki-background` |
| `--shiki-color-ansi-*`     | `--shiki-ansi-*`     |
