---
outline: deep
---

# @shikijs/stream

<Badges name="@shikijs/stream" />

用于 Shiki 的流式着色。适合高亮文本流，例如 LLM 输出这类内容：代码会逐步到达，你希望每个块在落地时就被高亮，而无需重新对整个文档进行分词。

## 安装

::: code-group

```sh [npm]
npm i -D @shikijs/stream
```

```sh [yarn]
yarn add -D @shikijs/stream
```

```sh [pnpm]
pnpm add -D @shikijs/stream
```

```sh [bun]
bun add -D @shikijs/stream
```

```sh [deno]
deno add npm:@shikijs/stream
```

:::

## 用法

使用 `CodeToTokenTransformStream` 创建一个转换流，并通过 `.pipeThrough` 处理你的文本流：

```ts
import { CodeToTokenTransformStream } from '@shikijs/stream'
import { createHighlighter, createJavaScriptRegexEngine } from 'shiki'

// 在应用中的某处初始化 Shiki 高亮器
const highlighter = await createHighlighter({
  langs: [/* ... */],
  themes: [/* ... */],
  engine: createJavaScriptRegexEngine(),
})

// 你想要高亮的 ReadableStream<string>
const textStream = getTextStreamFromSomewhere()

// 将文本流通过 token 流进行传递
const tokensStream = textStream
  .pipeThrough(new CodeToTokenTransformStream({
    highlighter,
    lang: 'javascript',
    theme: 'nord',
    allowRecalls: true, // 见下方说明
  }))
```

### `allowRecalls`

由于高亮结果可能会随着代码上下文而变化，主题化 token 可以在流推进的过程中重新计算。由于流是单向的，`@shikijs/stream` 会发出一种特殊的 **recall** token，告诉接收方丢弃最后 N 个已发生变化的 token。

默认情况下，`CodeToTokenTransformStream` 只会发出 **稳定** token——不会发出 recall。代价是粒度更粗，通常一次是一行。

对于能够处理 recall 的流消费者（例如内置的 Vue、React、Solid 和 Svelte 组件），将 `allowRecalls: true` 设置为可获得更细粒度的 token。

通常，recall 应按如下方式处理：

```ts
import type { RecallToken } from '@shikijs/stream'
import type { ThemedToken } from 'shiki'

const receivedTokens: ThemedToken[] = []

tokensStream.pipeTo(new WritableStream<ThemedToken | RecallToken>({
  async write(token) {
    if ('recall' in token) {
      // 丢弃最后 `token.recall` 个 token
      receivedTokens.length -= token.recall
    }
    else {
      receivedTokens.push(token)
    }
  },
}))
```

## 消费令牌流

### 手动

```ts
tokensStream.pipeTo(new WritableStream({
  async write(token) {
    console.log(token)
  },
}))
```

或者在 Node.js 中：

```ts
for await (const token of tokensStream) {
  console.log(token)
}
```

### Vue

```vue
<script setup lang="ts">
import { ShikiStreamRenderer } from '@shikijs/stream/vue'

// 获取令牌流
</script>

<template>
  <ShikiStreamRenderer :stream="tokensStream" />
</template>
```

### React

```tsx
import { ShikiStreamRenderer } from '@shikijs/stream/react'

export function MyComponent() {
  // 获取令牌流
  return <ShikiStreamRenderer stream={tokensStream} />
}
```

### Solid

```tsx
import { ShikiStreamRenderer } from '@shikijs/stream/solid'

export function MyComponent() {
  // 获取令牌流
  return <ShikiStreamRenderer stream={tokensStream} />
}
```

### Svelte

```svelte
<script lang="ts">
import { ShikiStreamRenderer } from '@shikijs/stream/svelte'

// 获取令牌流
</script>

<ShikiStreamRenderer stream={tokensStream} />
```

## 缓存渲染器

`@shikijs/stream` 还提供了一个简化的渲染器，适用于常见的逐步更新代码字符串的场景（而不是 token 流）。

::: warning Experimental
此 API 处于实验阶段，未来可能会发生变化。
:::

### Vue

```vue
<script setup lang="ts">
import { ShikiCachedRenderer } from '@shikijs/stream/vue'
import { createHighlighter, createJavaScriptRegexEngine } from 'shiki'
import { onMounted, ref } from 'vue'

const highlighter = await createHighlighter({
  langs: [/* ... */],
  themes: [/* ... */],
  engine: createJavaScriptRegexEngine(),
})

const code = ref('') // 代码应仅以增量方式更新

// 仅用于演示
onMounted(() => {
  setInterval(() => {
    code.value += '\nconsole.log("Hello, world!");'
  }, 1000)
})
</script>

<template>
  <ShikiCachedRenderer
    :highlighter="highlighter"
    :code="code"
    lang="js"
    theme="vitesse-light"
  />
</template>
```
