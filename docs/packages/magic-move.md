---
outline: deep
---

# @shikijs/magic-move

<Badges name="@shikijs/magic-move" />

使用 Shiki 的平滑动画代码块。适用于幻灯片中的代码步骤动画（例如 [Slidev](https://sli.dev/guide/syntax#shiki-magic-move)）和教程。

`@shikijs/magic-move` 是一个底层库：其核心是一个与框架无关的 [diff/动画引擎](https://github.com/shikijs/shiki/blob/main/packages/magic-move/src/core.ts) 和 [渲染器](https://github.com/shikijs/shiki/blob/main/packages/magic-move/src/renderer.ts)，并为 Vue、React、Solid、Svelte 以及 Web Component 提供了轻量封装。

每个框架封装都提供三个组件：

- **`ShikiMagicMove`** — 主组件；包装代码块，并在 `code` 变化时进行动画处理
- **`ShikiMagicMovePrecompiled`** — 针对已编译 token 的动画，不依赖运行时的 Shiki
- **`ShikiMagicMoveRenderer`** — 底层渲染器组件

`ShikiMagicMove` 需要一个 Shiki 高亮器实例以及捆绑的样式表（`@shikijs/magic-move/style.css`）。每当 `code` 变化时，组件都会对差异进行动画处理。

## 安装

::: code-group

```sh [npm]
npm i -D @shikijs/magic-move shiki
```

```sh [yarn]
yarn add -D @shikijs/magic-move shiki
```

```sh [pnpm]
pnpm add -D @shikijs/magic-move shiki
```

```sh [bun]
bun add -D @shikijs/magic-move shiki
```

```sh [deno]
deno add npm:@shikijs/magic-move npm:shiki
```

:::

## 用法

### Vue

导入 `@shikijs/magic-move/vue`，并将高亮器实例传递给 `ShikiMagicMove` 组件。

```vue
<script setup>
import { ShikiMagicMove } from '@shikijs/magic-move/vue'
import { createHighlighter } from 'shiki'
import { ref } from 'vue'

import '@shikijs/magic-move/style.css'

const highlighter = await createHighlighter({
  themes: ['nord'],
  langs: ['javascript', 'typescript'],
})

const code = ref(`const hello = 'world'`)

function animate() {
  code.value = `let hi = 'hello'`
}
</script>

<template>
  <ShikiMagicMove
    lang="ts"
    theme="nord"
    :highlighter="highlighter"
    :code="code"
    :options="{ duration: 800, stagger: 0.3, lineNumbers: true }"
  />
  <button @click="animate">
    动画
  </button>
</template>
```

### React

导入 `@shikijs/magic-move/react`，并将高亮器实例传递给 `ShikiMagicMove` 组件。

```tsx
import type { HighlighterCore } from 'shiki'
import { ShikiMagicMove } from '@shikijs/magic-move/react'
import { useEffect, useState } from 'react'
import { createHighlighter } from 'shiki'

import '@shikijs/magic-move/style.css'

function App() {
  const [code, setCode] = useState(`const hello = 'world'`)
  const [highlighter, setHighlighter] = useState<HighlighterCore>()

  useEffect(() => {
    async function initializeHighlighter() {
      const h = await createHighlighter({
        themes: ['nord'],
        langs: ['javascript', 'typescript'],
      })
      setHighlighter(h)
    }
    initializeHighlighter()
  }, [])

  function animate() {
    setCode(`let hi = 'hello'`)
  }

  return (
    <div>
      {highlighter && (
        <>
          <ShikiMagicMove
            lang="ts"
            theme="nord"
            highlighter={highlighter}
            code={code}
            options={{ duration: 800, stagger: 0.3, lineNumbers: true }}
          />
          <button onClick={animate}>动画</button>
        </>
      )}
    </div>
  )
}
```

### Solid

导入 `@shikijs/magic-move/solid`，并将高亮器实例传递给 `ShikiMagicMove` 组件。

```tsx
import { ShikiMagicMove } from '@shikijs/magic-move/solid'
import { bundledLanguages, bundledThemes, createHighlighter } from 'shiki'
import { createResource, createSignal, Show } from 'solid-js'

import '@shikijs/magic-move/style.css'

function App() {
  const [code, setCode] = createSignal(`const hello = 'world'`)

  const [highlighter] = createResource(async () => {
    return await createHighlighter({
      themes: Object.keys(bundledThemes),
      langs: Object.keys(bundledLanguages),
    })
  })

  function animate() {
    setCode(`let hi = 'hello'`)
  }

  return (
    <div>
      <Show when={highlighter()}>
        {h => (
          <>
            <ShikiMagicMove
              lang="ts"
              theme="nord"
              highlighter={h()}
              code={code()}
              options={{ duration: 800, stagger: 0.3, lineNumbers: true }}
            />
            <button onClick={animate}>动画</button>
          </>
        )}
      </Show>
    </div>
  )
}
```

### Svelte

导入 `@shikijs/magic-move/svelte`，并将高亮器实例传递给 `ShikiMagicMove` 组件。

```svelte
<script lang="ts">
  import { ShikiMagicMove } from '@shikijs/magic-move/svelte'
  import { createHighlighter } from 'shiki'

  import '@shikijs/magic-move/style.css'

  const highlighter = createHighlighter({
    themes: ['nord'],
    langs: ['javascript', 'typescript'],
  })

  let code = $state(`const hello = 'world'`)

  function animate() {
    code = `let hi = 'hello'`
  }
</script>

{#await highlighter then highlighter}
  <ShikiMagicMove
    lang="ts"
    theme="nord"
    {highlighter}
    {code}
    options={{ duration: 800, stagger: 0.3, lineNumbers: true }}
  />
  <button onclick={animate}>动画</button>
{/await}
```

## `ShikiMagicMovePrecompiled`

`ShikiMagicMovePrecompiled` 是 `ShikiMagicMove` 的一个更轻量版本，它在运行时不需要 Shiki——当你希望预先打包分词后的步骤数据（例如在构建时生成），并在浏览器中在步骤之间进行动画过渡时，这会很有用。

```vue
<script setup>
import { ShikiMagicMovePrecompiled } from '@shikijs/magic-move/vue'
import { ref } from 'vue'

const step = ref(1)
const compiledSteps = [/* 编译后的 token 步骤 */]
</script>

<template>
  <ShikiMagicMovePrecompiled
    :steps="compiledSteps"
    :step="step"
  />
  <button @click="step++">
    下一步
  </button>
</template>
```

要生成已编译的 tokens，请在某个能访问 Shiki 的环境中运行这段代码（构建脚本、服务器等），并将结果序列化：

```ts
import { codeToKeyedTokens, createMagicMoveMachine } from '@shikijs/magic-move/core'
import { createHighlighter } from 'shiki'

const shiki = await createHighlighter({
  themes: ['nord'],
  langs: ['javascript', 'typescript'],
})

const codeSteps = [
  `const hello = 'world'`,
  `let hi = 'hello'`,
]

const machine = createMagicMoveMachine(
  code => codeToKeyedTokens(shiki, code, {
    lang: 'ts',
    theme: 'nord',
  }),
  {
    // 选项
  },
)

const compiledSteps = codeSteps.map(code => machine.commit(code).current)

// 将 `compiledSteps` 传递给预编译组件。
// 由于这些都是普通的可序列化对象，你可以在构建时将它们字符串化，
// 并在浏览器中重新载入，而无需 Shiki。
```

## 工作原理

若想深入了解动画背后的算法，请参阅 Anthony 的文章 [**Shiki Magic Move 的魔力**](https://antfu.me/posts/shiki-magic-move)。
