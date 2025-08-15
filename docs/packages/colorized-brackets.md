---
outline: deep
---

# @shikijs/colorized-brackets

<Badges name="@shikijs/colorized-brackets" />

Shiki 的 VSCode 风格彩色括号变换器。

## 安装

::: code-group

```sh [npm]
npm i -D @shikijs/colorized-brackets
```

```sh [yarn]
yarn add -D @shikijs/colorized-brackets
```

```sh [pnpm]
pnpm add -D @shikijs/colorized-brackets
```

```sh [bun]
bun add -D @shikijs/colorized-brackets
```

```sh [deno]
deno add npm:@shikijs/colorized-brackets
```

:::

## 用法

添加到您的 Shiki 转换器：

```ts colorize-brackets
import { transformerColorizedBrackets } from '@shikijs/colorized-brackets'
import { codeToHtml } from 'shiki'

const html = await codeToHtml('let values: number[] = [];', {
  lang: 'ts',
  theme: 'dark-plus',
  transformers: [transformerColorizedBrackets()],
})
```

### 颜色

括号会根据您的 Shiki 主题（或使用 [双主题](https://shiki.style/guide/dual-themes) 时的主题）自动上色，支持所有内置的 Shiki 主题。不过，如果您向 Shiki 添加了自定义主题，或者想要覆盖内置主题的颜色，您可以进行自定义。

```ts colorize-brackets
const html = await codeToHtml('let values: number[] = [];', {
  lang: 'ts',
  theme: myCustomTheme,
  transformers: [transformerColorizedBrackets({
    themes: {
      'my-custom-theme': ['goldenrod', 'blueviolet', 'dodgerblue', 'crimson'],
    },
  })],
})
```

最终颜色是不匹配的括号颜色。其他颜色是每一对括号“级别”的颜色。可以使用任何有效的 CSS 颜色。

如果主题中没有找到括号颜色，则回退到默认的 `dark-plus` 主题。

### 括号

您可以自定义括号对：

```ts colorize-brackets
const transformer = transformerColorizedBrackets({
  bracketPairs: [{ opener: '{', closer: '}' }],
})
```

上述内容仅为 `{}` 大括号着色。默认配置会对 `[]` 方括号、`{}` 大括号、`()` 圆括号和 `<>` 尖括号（仅在 TS 类型注释中）进行着色。

对于高级用法，您可以使用 `scopesAllowList` 和 `scopesDenyList` 指定括号对允许或拒绝的 TextMate 范围。例如，`<>` 尖括号的默认配置是：

```ts colorize-brackets
const bracketPair = {
  opener: '<',
  closer: '>',
  scopesAllowList: [
    'punctuation.definition.typeparameters.begin.ts',
    'punctuation.definition.typeparameters.end.ts',
  ],
}
```

### 语言特定重写

所有设置都可以通过 `langs` 选项为特定语言进行重写：

```ts colorize-brackets
const transformer = transformerColorizedBrackets({
  langs: { ts: myCustomTypescriptConfig },
})
```

### 显式触发器

如果您不希望所有代码块使用彩色括号，可以启用 `explicitTrigger` 选项：

```ts colorize-brackets
const transformer = transformerColorizedBrackets({
  explicitTrigger: true,
})
```

然后，只有带有 `colorize-brackets` [元字符串](/guide/transformers#meta) 的代码块才会启用括号着色。

````md
```ts
// no bracket colorizing
```

```ts colorize-brackets
// brackets will be colorized
```
````
