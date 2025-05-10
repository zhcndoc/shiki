---
outline: deep
---

# 正则表达式引擎

TextMate 语法基于匹配标记的正则表达式。更具体地说，它们假设将使用 [Oniguruma](https://github.com/kkos/oniguruma) （一个用 C 编写的强大正则表达式引擎）来解释正则表达式。为了在 JavaScript 中实现这一点，我们将 Oniguruma 编译为 WebAssembly 以在浏览器或 Node.js 中运行。

自 v1.15 起，我们提供了让用户切换正则表达式引擎或提供自定义实现的功能。要实现这一点，请在 `createHighlighter` 或 `createHighlighterCore` 中添加 `engine` 选项。例如：

```ts
import { createHighlighter } from 'shiki'

const shiki = await createShiki({
  themes: ['nord'],
  langs: ['javascript'],
  engine: { /* custom engine */ }
})
```

Shiki 附带两个内置引擎：

## Oniguruma 引擎

这是默认的引擎，使用编译后的 Oniguruma WebAssembly。

```ts
import { createHighlighter } from 'shiki'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

const shiki = await createShiki({
  themes: ['nord'],
  langs: ['javascript'],
  engine: createOnigurumaEngine(import('shiki/wasm'))
})
```

## JavaScript 正则表达式引擎

该引擎使用 JavaScript 的原生 `RegExp`。由于 TextMate 语法使用的正则表达式是为 Oniguruma 编写的，我们使用 [Oniguruma-To-ES](https://github.com/slevithan/oniguruma-to-es) 将 Oniguruma 模式转译为原生 JavaScript 正则表达式。

```ts {2,4,9}
import { createHighlighter } from 'shiki'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

const jsEngine = createJavaScriptRegexEngine()

const shiki = await createHighlighter({
  themes: ['nord'],
  langs: ['javascript'],
  engine: jsEngine
})

const html = shiki.codeToHtml('const a = 1', { lang: 'javascript', theme: 'nord' })
```

使用 JavaScript 引擎的优点是它不需要加载大型的 Oniguruma WebAssembly 文件，并且对于某些语言来说速度更快（因为正则表达式作为本地 JavaScript 运行）。

请查看 [兼容性表](/references/engine-js-compat) 以获取您使用的语言的支持状态。几乎所有语言都受到支持。

::: info
JavaScript 引擎在浏览器中运行时表现最佳，尤其是在你想要控制包大小的情况下。如果你在 Node.js（或在构建时）运行 Shiki，并且对包大小或 WebAssembly 支持不关心，Oniguruma 引擎可以确保最大程度的语言兼容性。
:::

### 使用不支持的语言

与 Oniguruma 引擎不同，JavaScript 引擎默认是严格的。如果遇到无效的 Oniguruma 模式或无法转换的模式，它将抛出错误。如果您希望对不支持的语法进行尽力而为的结果，可以启用 `forgiving` 选项以抑制任何转换错误：

```ts
const jsEngine = createJavaScriptRegexEngine({ forgiving: true })
// ...使用引擎
```

请谨慎使用此选项，因为可能会出现高亮不匹配的情况。

### JavaScript 运行时目标

为了获得最佳效果，JavaScript 引擎使用 [RegExp 的 `v` 标志](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets)，该标志在 Node.js v20+ 和 ES2024 中可用 ([浏览器兼容性](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets#browser_compatibility))。对于较旧的环境，它会自动改用 `u` 标志，但这会导致支持的语法减少。

默认情况下，运行时目标会自动检测。您可以通过设置 `target` 选项来覆盖此行为：

```ts
const jsEngine = createJavaScriptRegexEngine({
  target: 'ES2018', // or 'auto' (default), 'ES2024', 'ES2025'
})
```

### 预编译语言

我们还提供预编译的语言，以进一步减少启动时间，而不是即时编译正则表达式。

::: warning
预编译语言尚不支持，因为存在一个影响许多语言的 [已知问题](https://github.com/shikijs/shiki/issues/918)。请谨慎使用。
:::

::: info
预编译语言需要支持 RegExp UnicodeSets（`v` 标志），这需要 ES2024 或 Node.js 20 及以上版本，可能在较旧的环境中无法工作。[Can I use](https://caniuse.com/mdn-javascript_builtins_regexp_unicodesets)。
:::

您可以使用 `@shikijs/langs-precompiled` 安装它们，并将您的 `@shikijs/langs` 导入更改为 `@shikijs/langs-precompiled`：

```ts
import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRawEngine } from 'shiki/engine/javascript'

const highlighter = await createHighlighterCore({
  langs: [
    import('@shikijs/langs/javascript'), // [!code --]
    import('@shikijs/langs/typescript'), // [!code --]
    import('@shikijs/langs-precompiled/javascript'), // [!code ++]
    import('@shikijs/langs-precompiled/typescript'), // [!code ++]
    // ...
  ],
  themes: [
    import('@shikijs/themes/nord'),
  ],
  engine: createJavaScriptRegexEngine(), // [!code --]
  engine: createJavaScriptRawEngine(), // [!code ++]
})
```

如果您不使用需要转译的自定义语法，您可以使用 `createJavaScriptRawEngine` 跳过转译步骤，从而进一步减少包的大小。

如果您正在使用 [`shiki-codegen`](/packages/codegen)，可以使用 `--precompiled` 和 `--engine=javascript-raw` 标志生成预编译语言。
