---
outline: deep
---

# 最佳性能实践

本指南将帮助您提高 Shiki 使用的性能。

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

当您不再需要高亮实例时，可以调用 `dispose()` 方法来释放资源。（它不能被自动垃圾回收，您需要显式地进行。）

```ts
highlighter.dispose()
```

## 细粒度包

预构建的捆绑包便于使用，主要用于不担心捆绑包大小的 Node.js 环境。如果您正在构建一个 web 应用程序或在一个资源受限的环境中，使用细粒度的捆绑包以减少捆绑包大小和内存使用总是更好的选择。

**避免直接导入 `shiki`、`shiki/bundle/full`、`shiki/bundle/web`**。

相反，导入细粒度模块，比如 `shiki/core`、`shiki/engine/javascript`、`@shikijs/langs/typescript`、`@shikijs/themes/dark-plus` 等。

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

为了方便地组成细粒度的包，我们还提供了 [`shiki-codegen`](/packages/codegen) 工具来为您生成细粒度的包。

了解更多关于 [细粒度包](/guide/bundles#fine-grained-bundle) 的信息。

## 使用缩写

`createHighlighter` 和 `createHighlighterCore` 提前加载所有主题和语言，以确保后续的高亮操作是同步的。这可能会显著增加启动时间的开销，特别是当您有很多主题和语言时。简写抽象了主题和语言的加载过程，并在内部维护一个高亮实例，只有在需要时才加载必要的主题和语言。当您的高亮过程可以是异步时，您可以使用简写来减少启动时间。

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

Shiki 提供了 [两个引擎](/guide/regex-engines) 用于执行正则表达式：[`JavaScript`](/guide/regex-engines#javascript-regexp-engine) 和 [`Oniguruma`](/guide/regex-engines#oniguruma-engine)。Oniguruma 引擎是基于 WebAssembly 的，并从 C 代码编译而来，而 `JavaScript` 是一个纯 JavaScript 引擎，它将 Oniguruma 风格的正则表达式转换为 JavaScript 正则表达式。

如果您将 Shiki 打包用于网页，使用 JavaScript 引擎会导致更小的打包大小和更快的启动时间。如果您的目标浏览器支持最新的 RegExp 特性， [预编译语言](/guide/regex-engines#pre-compiled-languages) 可以进一步减少打包大小和启动时间。

有关更多详细信息，请参阅 [RegExp 引擎](/guide/regex-engines) 指南。

## 使用 Workers

Shiki 使用正则表达式高亮显示代码，这可能是 CPU 密集型的。您可以将高亮工作卸载到 Web Worker/Node Worker，以避免阻塞主线程。

::: info

🚧 我们仍在努力制作易于创建 Worker 的指南。

:::
