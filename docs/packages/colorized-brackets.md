---
outline: deep
---

# @shikijs/colorized-brackets

<Badges name="@shikijs/colorized-brackets" />

适用于 Shiki 的 VSCode 风格彩色括号转换器。

## 安装

```bash
npm i -D @shikijs/colorized-brackets
```

## 使用

添加到你的 Shiki 转换器中：

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

括号会根据你的 Shiki 主题（如果使用 [双主题](https://shiki.style/guide/dual-themes)，则使用多个主题）自动着色，并支持 Shiki 的所有内置主题。然而，如果你添加了自定义主题，或者如果你想覆盖内置主题的颜色，你可以自定义颜色：

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

最终的颜色是未配对括号的颜色。其他颜色是每个“层级”配对括号的颜色。可以使用任何有效的 CSS 颜色。

如果未找到主题的括号颜色，将回退至默认的 `dark-plus` 主题。

### 括号

你可以自定义括号配对：

```ts colorize-brackets
const transformer = transformerColorizedBrackets({
  bracketPairs: [{ opener: '{', closer: '}' }],
})
```

上述代码将仅给 `{}` 花括号上色。默认配置会为 `[]` 方括号、`{}` 花括号、`()` 圆括号和 `<>` 尖括号（仅在 TS 类型注解中）上色。

对于高级用法，你可以指定在哪些 TextMate 范围内允许或拒绝某个括号配对，使用 `scopesAllowList` 和 `scopesDenyList`。例如，`<>` 尖括号的默认配置为：

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

### 语言特定覆盖

所有设置都可以通过 `langs` 选项为特定语言覆盖：

```ts colorize-brackets
const transformer = transformerColorizedBrackets({
  langs: { ts: myCustomTypescriptConfig },
})
```

### 明确触发

如果你不希望所有代码块都有颜色化括号，可以启用 `explicitTrigger` 选项：

```ts colorize-brackets
const transformer = transformerColorizedBrackets({
  explicitTrigger: true,
})
```

然后，只有包含 `colorize-brackets` [元字符串](/guide/transformers#meta) 的代码块将启用括号颜色化。

````md
```ts
// 无括号颜色化
```

```ts colorize-brackets
// 括号将被颜色化
```
````