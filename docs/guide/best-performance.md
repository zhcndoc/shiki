---
outline: deep
---

# 最佳性能实践

本指南将帮助您提高 Shiki 的使用性能。

## 缓存高亮器实例

创建高亮器实例的开销很大。大多数情况下，您应该创建高亮器实例一次，并在多次高亮操作中复用它（单例模式）。

例如：

```ts
import { createHighlighterCore } from 'shiki/core'

const highlighterPromise = createHighlighterCore({ /* ... */ })

export async function highlightCode(code: string, lang: string) {
  const highlighter = await highlighterPromise
  return highlighter.codeToHtml(code, lang)
}
```

当您不再需要高亮器实例时，可以调用 `dispose()` 方法来释放资源。（它不能自动被垃圾回收，您需要显式地做这件事）

```ts
highlighter.dispose()
```

## 细粒度包

预构建的包便于使用，主要针对 Node.js 环境，在那里您不必过于担心包的大小。如果您正在构建 Web 应用程序，或在资源受限的环境中，使用细粒度包来减少包的大小和内存使用总是更好的选择。

**避免直接导入 `shiki`、`shiki/bundle/full`、`shiki/bundle/web`**。

相反，导入细粒度模块，如 `shiki/core`、`shiki/engine/javascript`、`@shikijs/langs/typescript`、`@shikijs/themes/dark-plus` 等。

```ts
import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

const highlighter = await createHighlighterCore({
  themes: [
    import('@shikijs/themes/nord'),
    import('@shikijs/themes/dark-plus'),
    // ...
  ],
  langs: [
    import('@shikijs/langs/typescript'),
    import('@shikijs/langs/javascript'),
    // ...
  ],
  engine: createJavaScriptRegexEngine()
})
```

为了更容易组合细粒度包，我们还提供了 [`shiki-codegen`](/packages/codegen) 工具，帮助您生成细粒度包。

了解更多关于 [细粒度包](/guide/bundles#fine-grained-bundle) 的信息。

## 使用缩写

`createHighlighter` 和 `createHighlighterCore` 将提前加载所有主题和语言，以确保后续的高亮操作是同步的。这可能会显著增加启动时间，特别是当您有很多主题和语言时。

```ts
import { codeToHtml } from 'shiki'

// 只有在调用 `codeToHtml` 时才会加载 `javascript` 和 `nord`
const html = await codeToHtml('const a = 1', {
  lang: 'javascript',
  theme: 'nord'
})
```

您也可以使用细粒度包创建自己的缩写。有关更多细节，请查看 [使用细粒度包创建缩写](/guide/shorthands#create-shorthands-with-fine-grained-bundles) 部分。

## JavaScript 引擎和预编译语言

Shiki 提供了 [两种引擎](/guide/regex-engines) 来执行正则表达式：[`JavaScript`](/guide/regex-engines#javascript-regexp-engine) 和 [`Oniguruma`](/guide/regex-engines#oniguruma-engine)。Oniguruma 引擎是基于 WebAssembly 的，由 C++ 代码编译而成，而 `JavaScript` 是一个纯 JavaScript 引擎，将 Oniguruma 风格的正则表达式转换为 JavaScript 正则表达式。

如果您要为 Web 打包 Shiki，使用 JavaScript 引擎将会减小包的大小，并加快启动时间。同时， [预编译语言](/guide/regex-engines#pre-compiled-languages) 也可以减少包的大小和启动时间，如果您的目标浏览器支持最新的 RegExp 特性。

## 使用 Workers

Shiki 使用正则表达式高亮代码，这可能会消耗 CPU。您可以将高亮工作移交给 Web Worker/Node Worker，以避免阻塞主线程。

::: info

🚧 我们仍在努力制作易于创建 Worker 的指南。

:::

```

```

```

```
