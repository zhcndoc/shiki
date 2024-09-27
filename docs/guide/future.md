# 未来

我们计划在未来主要版本中移除一些已弃用的 API 并优化代码树摇晃。

计划如下：

- 👉 `v1.x`: 仍然支持已弃用的 API，仅在类型级别标记。可以通过调用 `enableDeprecationWarnings()` 在应用程序开始时启用可选的运行时警告。
- `v2.0`: 不包含破坏性变更，但默认启用运行时已弃用警告。
- `v3.0`: 移除已弃用的 API，包含破坏性变更。

在当前版本 v1.19.0 中，您可以通过在应用程序开始时调用 `enableDeprecationWarnings()` 来启用运行时警告。

```ts
import { enableDeprecationWarnings, getHighlighter } from 'shiki'

enableDeprecationWarnings() // [!code hl]

// Then calling deprecated usages like below would warn:
// [SHIKI DEPRECATED]: Use `createHighlighter` instead
const shiki = await getHighlighter(/* ... */)
```

这将帮助你更好地准备未来的变化并顺利升级。

## 显著弃用

### `getHighlighter` -> `createHighlighter`

功能上没有变化，但更像是为了避免混淆而纠正命名。这应该是一个简单的查找和替换。

### WASM 相关 API

自从 v0.16 版本中引入了[引擎系统](/guide/regex-engines)，WebAssembly 相关的依赖不再是硬性要求。为了更容易地进行树摇（tree-shaking），并将引擎与核心解耦，提取了两个包 `@shikijs/engine-oniguruma` 和 `@shikijs/engine-javascript`。它们也从主包的 `shiki/engine/oniguruma` 和 `shiki/engine/javascript` 分别被重新导出。

你可能需要更改你的导入路径：

```ts
import { loadWasm } from 'shiki' // [!code --]
import { loadWasm } from 'shiki/engine/oniguruma' // [!code ++]
```

`getHighlighter` 中的 `loadWasm` 字段被 `engine` 字段替换：

```ts
import { createHighlighter } from 'shiki'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma' // [!code ++]

const shiki = await createHighlighter({
  // ...
  loadWasm: () => import('shiki/wasm'), // [!code --]
  engine: createOnigurumaEngine(() => import('shiki/wasm')), // [!code ++]
})
```
