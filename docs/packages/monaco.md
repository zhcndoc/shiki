# Monaco 编辑器集成

Shiki 使用与 VS Code 相同的 TextMate 语法和主题，因此可以用于为 Monaco 编辑器添加高亮。Shiki 提供了官方的 Monaco 编辑器集成。你也可以使用包含内置 Shiki 集成的 [modern-monaco](https://github.com/esm-dev/modern-monaco)。

## @shikijs/monaco

<Badges name="@shikijs/monaco" />

使用 Shiki 为 [Monaco 编辑器](https://microsoft.github.io/monaco-editor/) 添加高亮。

Monaco 自带的高亮器没有使用完整的 TextMate 语法，在某些情况下精度不足。这个包允许你用 Shiki 的语法高亮引擎为 Monaco 添加高亮，使用 Shiki 共享的语法和主题。

灵感主要来自 [`monaco-editor-textmate`](https://github.com/zikaari/monaco-editor-textmate)。

### 安装

::: code-group

```sh [npm]
npm i -D @shikijs/monaco
```

```sh [yarn]
yarn add -D @shikijs/monaco
```

```sh [pnpm]
pnpm add -D @shikijs/monaco
```

```sh [bun]
bun add -D @shikijs/monaco
```

```sh [deno]
deno add npm:@shikijs/monaco
```

:::

### 用法

```ts
import { shikiToMonaco } from '@shikijs/monaco'
import * as monaco from 'monaco-editor-core'
import { createHighlighter } from 'shiki'

// 创建高亮实例，可以重复使用
const highlighter = await createHighlighter({
  themes: [
    'vitesse-dark',
    'vitesse-light',
  ],
  langs: [
    'javascript',
    'typescript',
    'vue'
  ],
})

// 先注册语言 ID，只有注册的语言才会被高亮
monaco.languages.register({ id: 'vue' })
monaco.languages.register({ id: 'typescript' })
monaco.languages.register({ id: 'javascript' })

// 从 Shiki 注册主题，并为 Monaco 提供语法高亮支持。 // [!code highlight:2]
shikiToMonaco(highlighter, monaco)

// 创建编辑器
const editor = monaco.editor.create(document.getElementById('container'), {
  value: 'const a = 1',
  language: 'javascript',
  theme: 'vitesse-dark',
})

// ... 按照正常方式使用编辑器
```

## modern-monaco

<Badges name="modern-monaco" />

我们强烈推荐使用包含内置 Shiki 集成的 [modern-monaco](https://github.com/esm-dev/modern-monaco)。它为构建 Monaco 编辑器提供了更便捷的 API。

### 安装

::: code-group

```sh [npm]
npm i -D modern-monaco
```

```sh [yarn]
yarn add -D modern-monaco
```

```sh [pnpm]
pnpm add -D modern-monaco
```

```sh [bun]
bun add -D modern-monaco
```

```sh [deno]
deno add npm:modern-monaco
```

:::

或者在浏览器中通过 [esm.sh](https://esm.sh) CDN 导入，无需构建步骤：

```js
import * as monaco from 'https://esm.sh/modern-monaco'
```

### 用法

```html
<!-- index.html -->
<monaco-editor theme="vitesse-dark"></monaco-editor>
<script src="app.js" type="module"></script>
```

```js
// app.js
import { lazy, Workspace } from 'modern-monaco'

// 创建一个包含初始文件的 workspace
const workspace = new Workspace({
  initialFiles: {
    'index.html': `<html><body>...</body></html>`,
    'main.js': `console.log('Hello, world!')`,
  },
  entryFile: 'index.html',
})

// 延迟初始化编辑器
await lazy({ workspace })

// 写入文件并在编辑器中打开
workspace.fs.writeFile('util.js', 'export function add(a, b) { return a + b; }')
workspace.openTextDocument('util.js')
```

更多用法请参阅 [modern-monaco](https://github.com/esm-dev/modern-monaco) 仓库。