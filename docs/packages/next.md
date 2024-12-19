# Next.js

Shiki 并没有为 [Next.js](https://nextjs.org) 提供官方集成，但在 Next.js 应用中使用 Shiki 其实非常简单。

::: info
在边缘运行时上使用 Shiki 可能会导致意外问题，Shiki 依赖于懒导入来加载语言和主题。

建议使用无服务器运行时。
:::

## React 服务器组件

由于服务器组件仅在服务器上运行，因此您可以使用捆绑的高亮器，而不必担心捆绑大小。

```tsx
import type { BundledLanguage } from 'shiki'
import { codeToHtml } from 'shiki'

export default function Page() {
  return (
    <main>
      <CodeBlock lang="ts">
        {[
          'console.log("Hello")',
          'console.log("World")',
        ].join('\n')}
      </CodeBlock>
    </main>
  )
}

interface Props {
  children: string
  lang: BundledLanguage
}

async function CodeBlock(props: Props) {
  const out = await codeToHtml(props.children, {
    lang: props.lang,
    theme: 'github-dark'
  })

  return <div dangerouslySetInnerHTML={{ __html: out }} />
}
```

### 自定义组件

您还可以调用 `codeToHast` 来获取 HTML 抽象语法树，并使用 [`hast-util-to-jsx-runtime`](https://github.com/syntax-tree/hast-util-to-jsx-runtime) 渲染它。通过这种方法，您可以渲染自己的 `pre` 和 `code` 组件。

```tsx
import type { JSX } from 'react'
import type { BundledLanguage } from 'shiki'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { Fragment } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'
import { codeToHast } from 'shiki'

export default function Page() {
  return (
    <main>
      <CodeBlock lang="ts">
        {[
          'console.log("Hello")',
          'console.log("World")',
        ].join('\n')}
      </CodeBlock>
    </main>
  )
}

interface Props {
  children: string
  lang: BundledLanguage
}

async function CodeBlock(props: Props) {
  const out = await codeToHtml(props.children, {
    lang: props.lang,
    theme: 'github-dark'
  })

  return toJsxRuntime(out, {
    Fragment,
    jsx,
    jsxs,
    components: {
      // 您自定义的 `pre` 元素
      pre: props => <pre data-custom-codeblock {...props} />
    },
  }) as JSX.Element
}
```

## React 客户端组件

对于客户端组件，它们在服务器上预渲染并在客户端进行水合/渲染。
我们可以先创建一个客户端 `CodeBlock` 组件。

为高亮器创建 `shared.ts`：

```ts
import type { JSX } from 'react'
import type { BundledLanguage } from 'shiki/bundle/web'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { Fragment } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'
import { codeToHast } from 'shiki/bundle/web'

export async function highlight(code: string, lang: BundledLanguage) {
  const out = await codeToHast(code, {
    lang,
    theme: 'github-dark'
  })

  return toJsxRuntime(out, {
    Fragment,
    jsx,
    jsxs,
  }) as JSX.Element
}
```

在您的 `codeblock.tsx` 中：

```tsx
'use client'
import { useLayoutEffect, useState } from 'react'
import { highlight } from './shared'

export function CodeBlock({ initial }: { initial?: JSX.Element }) {
  const [nodes, setNodes] = useState(initial)

  useLayoutEffect(() => {
    void highlight('console.log("Rendered on client")', 'ts').then(setNodes)
  }, [])

  return nodes ?? <p>Loading...</p>
}
```

`initial` 属性可以从服务器组件传递，以便在服务器上预渲染代码块。

在您的 `page.tsx` 中：

```tsx
import { CodeBlock } from './codeblock'
import { highlight } from './shared'

export default async function Page() {
  // `initial` 是可选的。
  return (
    <main>
      <CodeBlock initial={await highlight('console.log("Rendered on server")', 'ts')} />
    </main>
  )
}
```

::: info
上述示例使用了 `shiki/bundle/web` 包。您可以将其更改为 [细粒度捆绑](/guide/bundles#fine-grained-bundle)，以完全控制捆绑的语言/主题。
:::

### 性能

Shiki 会懒加载请求的语言和主题，Next.js 打包器可以自动处理懒导入。
导入 `shiki` 或其 web 包对于大多数 Next.js 应用来说效率足够高，细粒度捆绑不会显著影响捆绑大小。

此外，您可以使用 `createHighlighter` API 预加载特定的语言和主题。
请参阅 [高亮器使用](/guide/install#highlighter-usage) 以获取更多详细信息。

### 高亮器实例

如果您将高亮器（不带 `await`）定义为全局变量，您可以直接从服务器和客户端组件中引用它。

```ts
import { createHighlighter } from 'shiki'

const highlighter = createHighlighter({
  themes: ['nord'],
  langs: ['javascript'],
})

// 在异步服务器组件内部，或客户端的 `useEffect`
const html = (await highlighter).codeToHtml('const a = 1', {
  lang: 'javascript',
  theme: 'nord'
})
```
