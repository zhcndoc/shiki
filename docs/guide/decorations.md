# 代码装饰

我们提供了一个装饰代码的 API，用来将渲染后指定位置的代码元素包裹在自定义类或前缀中。

```ts twoslash
import { codeToHtml } from 'shiki'

const code = `
const x = 10
console.log(x)
`.trim()

const html = await codeToHtml(code, {
  theme: 'vitesse-light',
  lang: 'ts',
  decorations: [ // [!code hl:8]
    {
      // line 和 character 都是从 0 开始索引的
      start: { line: 1, character: 0 },
      end: { line: 1, character: 11 },
      properties: { class: 'highlighted-word' }
    }
  ]
})
```

渲染的结果是 (已使用 CSS 样式化)：

```ts
// @decorations:[{"start":{"line":1,"character":0},"end":{"line":1,"character":11},"properties":{"class":"highlighted-word"}}]
const x = 10
console.log(x)
```

你也可以用代码相对偏移位置 (以 0 作为索引) 来指定位置：

```ts twoslash
import { codeToHtml } from 'shiki'

const code = `
const x = 10
console.log(x)
`.trim()
// ---cut---
const html = await codeToHtml(code, {
  theme: 'vitesse-light',
  lang: 'ts',
  decorations: [ // [!code hl:7]
    {
      start: 21,
      end: 24,
      properties: { class: 'highlighted-word' }
    }
  ]
})
```

这会渲染出：

```ts
// @decorations:[{"start":21,"end":24,"properties":{"class":"highlighted-word"}}]
const x = 10
console.log(x)
```

负字符位置表示从行末开始的字符，起始于行末：

```ts twoslash
import { DecorationItem } from 'shiki'
// ---cut---
const item: DecorationItem = {
  start: { line: 0, character: 0 },
  end: { line: 0, character: -1 },
  properties: { class: 'highlighted-word' }
}
```

这突出了整行的第一行：

```ts
// @decorations:[{"start":{"line":0,"character":0},"end":{"line":0,"character":-1},"properties":{"class":"highlighted-word"}}]
const x = 10
console.log(x)
```

## 在变换器中使用装饰

对于高级用例，您可以使用 [Transformers API](./transformers.md) 完全访问令牌和 HAST 树。

同时，如果您想在变换器中附加装饰，可以使用：

```ts twoslash
/* eslint-disable import/no-duplicates */
import { DecorationItem } from 'shiki'

function doSomethingWithCode(code: string): DecorationItem[] {
  return []
}
const code: string = ''

// ---cut---
import { codeToHtml, ShikiTransformer } from 'shiki'

const myTransformer: ShikiTransformer = {
  name: 'my-transformer',
  preprocess(code, options) {
    // 用某种方式生成代码装饰
    const decorations = doSomethingWithCode(code)

    // 确保装饰数组存在
    options.decorations ||= []
    // 添加代码装饰
    options.decorations.push(...decorations)
  }
}

const html = await codeToHtml(code, {
  theme: 'vitesse-light',
  lang: 'ts',
  transformers: [
    myTransformer
  ]
})
```

注意，你只能在 `preprocess` 钩子添加代码装饰，在往后的钩子中，装饰数组的修改会被忽略。
