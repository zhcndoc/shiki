# 同步使用

`await createHighlighter()` 和 `highlighter.codeToHtml()` 已经做到了异步和同步的分离。在大多数情况下，您应该能够在初始化阶段解决异步部分，之后同步地使用 highlighter。

在需要完全同步运行 Shiki 的一些极端情况下，从 v1.16 起，我们提供了核心 API 的同步版本。您可以使用 `createHighlighterCoreSync` 来同步创建 highlighter 实例。

```ts
import js from '@shikijs/langs/javascript'
import nord from '@shikijs/themes/nord'
import { createHighlighterCoreSync } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

const shiki = createHighlighterCoreSync({
  themes: [nord],
  langs: [js],
  engine: createJavaScriptRegexEngine()
})

const html = shiki.highlight('console.log(1)', { lang: 'js', theme: 'nord' })
```

这样做时，要求所有的 `themes` 和 `langs` 必须作为普通对象提供。同时，必须显式提供一个 `engine`。借助新的 [JavaScript 正则引擎](/guide/regex-engines#javascript-regexp-engine)，您也可以同步创建引擎实例。

[Oniguruma 引擎](/guide/regex-engines#oniguruma-engine) 只能异步创建，因此您需要在创建同步 highlighter 之前先解决引擎的 Promise。

```ts
import js from '@shikijs/langs/javascript'
import nord from '@shikijs/themes/nord'
import { createHighlighterCoreSync } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

// 事先在某处加载
const engine = await createOnigurumaEngine(import('shiki/wasm'))

const shiki = createHighlighterCoreSync({
  themes: [nord],
  langs: [js],
  engine, // 如果传入一个已解决的引擎，剩下的依然可以同步。
})

const html = shiki.highlight('console.log(1)', { lang: 'js', theme: 'nord' })
```