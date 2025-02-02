---
outline: deep
---

# VitePress 集成

[VitePress](https://vitepress.zhcndoc.com/) 在底层使用了 Shiki，所以你不需要显式地集成。

VitePress 提供了[一些 Shiki 的自定义选项](https://github.com/vuejs/vitepress/blob/main/src/node/markdown/markdown.ts#L66-L112)，在 [VitePress 文档](https://vitepress.zhcndoc.com/zh/reference/site-config#markdown)上查看更多。

## Twoslash

要在 Vitepress 中启用 [TypeScript Twoslash](/packages/twoslash) (类型悬停显示)，可以使用我们提供的插件来快速开始，它借助 [Floating Vue](https://floating-vue.starpad.dev/) 在容器外显示具有样式的类型信息。

<Badges name="@shikijs/vitepress-twoslash" />

### 设置

::: code-group

```sh [npm]
npm i -D @shikijs/vitepress-twoslash
```

```sh [yarn]
yarn add -D @shikijs/vitepress-twoslash
```

```sh [pnpm]
pnpm add -D @shikijs/vitepress-twoslash
```

```sh [bun]
bun add -D @shikijs/vitepress-twoslash
```

:::

在你的 [`vitepress/config.ts`](https://vitepress.zhcndoc.com/reference/site-config):

```ts [.vitepress/config.ts]
import { transformerTwoslash } from '@shikijs/vitepress-twoslash' // [!code hl]
import { defineConfig } from 'vitepress'

export default defineConfig({
  markdown: {
    codeTransformers: [
      transformerTwoslash() // [!code hl]
    ],
    // [!code hl:2]
    // Explicitly load these languages for types hightlighting
    languages: ['js', 'jsx', 'ts', 'tsx']
  }
})
```

然后在你的 [`.vitepress/theme/index.ts`](https://vitepress.zhcndoc.com/guide/custom-theme) 中，安装 Vue 插件并通过 `vitepress-plugin-twoslash/styles.css` 导入 CSS。

```ts twoslash [.vitepress/theme/index.ts]
// @noErrors: true
import type { EnhanceAppContext } from 'vitepress' // [!code hl]
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import Theme from 'vitepress/theme'

import '@shikijs/vitepress-twoslash/style.css' // [!code hl]

export default {
  extends: Theme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.use(TwoslashFloatingVue) // [!code hl]
  },
}
```

::: details 关于 style.css

方便起见，`vitepress-plugin-twoslash/styles.css` 包含了 `floating-vue` 和 `shiki-twoslash/style-rich.css` 中的样式，所以你只需要引入这一项。如果你使用的是自定义 `floating-vue` 样式，或者需要对样式进行更多控制，你可以将它展开成如下几项：

```ts
import '@shikijs/vitepress-twoslash/style.css'

// 等同于：
import '@shikijs/twoslash/style-rich.css'
import 'floating-vue/dist/style.css'
import '@shikijs/vitepress-twoslash/style-core.css'
```

:::

现在，你可以在你的 Markdown 文件中使用 `ts twoslash` 来启用美观的类型悬停显示。

````md
```ts twoslash
console.log('hello')
//      ^?
```
````

它会被渲染为：

```ts twoslash
console.log('hello')
//      ^?
```

<div class="h-100" /> <!-- leaving some space for the query above -->

### Vue SFC

此外，这个插件集成了 [`twoslash-vue`](https://github.com/antfu/twoslash-vue)，所以你可以使用 `vue twoslash` 高亮 Vue SFC 块：

```vue twoslash
<script setup>
import { onMounted, ref } from 'vue'

// 响应式状态
const count = ref(0)
//             ^?

// 修改状态并出发更新的函数
function increment() {
  count.value++
}

// 生命周期钩子
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">
    Count is: {{ count }}
  </button>
</template>
```

### 文件系统缓存

为了加快构建过程，您可以为生成的类型启用文件系统缓存，该缓存可以跨多个构建共享。默认情况下，缓存存储在 `.vitepress/cache/twoslash` 中，与其他 VitePress 缓存一起。

在您的 [`.vitepress/config.ts`](https://vitepress.zhcndoc.com/reference/site-config)：

```ts [.vitepress/config.ts]
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { createFileSystemTypesCache } from '@shikijs/vitepress-twoslash/cache-fs' // [!code hl]
import { defineConfig } from 'vitepress'

export default defineConfig({
  markdown: {
    codeTransformers: [
      transformerTwoslash({
        typesCache: createFileSystemTypesCache() // [!code hl]
      })
    ]
  }
})
```
