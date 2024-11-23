---
outline: deep
---

# 正则表达式引擎

TextMate 语法基于正则表达式来匹配标记。通常，我们使用 [Oniguruma](https://github.com/kkos/oniguruma)（用 C 编写的正则表达式引擎）来解析语法。为了使其在 JavaScript 中工作，我们将 Oniguruma 编译为 WebAssembly 以便在浏览器或 Node.js 中运行。

从 v1.15 开始，我们向用户提供了切换正则表达式引擎和提供自定义实现的能力。

为 `createHighlighter` 和 `createHighlighterCore` 添加了一个 `engine` 选项。例如：

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

这是使用已编译的 Oniguruma WebAssembly 的默认引擎。最准确和最强大的引擎。

```ts
import { createHighlighter } from 'shiki'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

const shiki = await createShiki({
  themes: ['nord'],
  langs: ['javascript'],
  engine: createOnigurumaEngine(import('shiki/wasm'))
})
```

## JavaScript 正则表达式引擎（实验性）

::: warning 实验性
此功能是实验性的，可能会在未遵循遵循语义化版本控制的情况下发生变化。
:::

此引擎使用 JavaScript 的原生正则表达式。由于 TextMate 语法使用的正则表达式是为 Oniguruma 编写的，它们可能包含 JavaScript 的正则表达式不支持的语法，或者对于相同语法期望不同的行为。因此，我们使用 [Oniguruma-To-ES](https://github.com/slevithan/oniguruma-to-es) 将 Oniguruma 模式转换为原生 JavaScript 正则表达式。

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

请查看 [兼容性表格](/references/engine-js-compat) 以了解您使用的语言的支持状态。

与 Oniguruma 引擎不同，JavaScript 引擎默认是严格的。如果它遇到无法转换的模式，则会抛出错误。如果您可以接受不匹配，并希望尽可能获得最佳努力结果，可以启用 `forgiving` 选项，以抑制转换过程中发生的任何错误：

```ts
const jsEngine = createJavaScriptRegexEngine({ forgiving: true })
// ...使用引擎
```

::: info
如果您在 Node.js（或构建时）上运行 Shiki，并且包大小或 WebAssembly 支持不是问题，我们仍然建议使用 Oniguruma 引擎以获得最佳结果。

JavaScript 引擎在浏览器中运行时及当您想要控制包大小时效果最佳。
:::

### JavaScript 运行时目标

为了获得最佳效果，[Oniguruma-To-ES](https://github.com/slevithan/oniguruma-to-es) 使用 [RegExp `v` 标志](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets)，该标志在 Node.js v20+ 和 ES2024 中可用（[浏览器兼容性](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets#browser_compatibility)）。

对于较旧的环境，它可以使用 `u` 标志，但支持的语法相对较少。

默认情况下，运行时目标会自动检测。您可以通过设置 `target` 选项来覆盖此行为：

```ts
const jsEngine = createJavaScriptRegexEngine({
  target: 'ES2018', // 或 'ES2024'，默认值是 'auto'
})
```