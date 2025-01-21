# 语法状态

`GrammarState` 是一个特殊的标记，持有语法上下文，并允许您从中间语法状态进行高亮，这使得高亮代码片段变得更加容易。

例如，如果我们想要高亮类型注解 `Pick<MyObject, string>[]`，我们可以通过 `getLastGrammarState` 方法获取语法状态，并传递给 `grammarState` 选项：

```ts
import { createHighlighter } from 'shiki'

const shiki = await createHighlighter({ langs: ['ts'], themes: ['github-dark'] })

const stateTypeAnnotation = shiki.getLastGrammarState('let a:', { lang: 'ts', theme: 'github-dark' })

const highlightedType = shiki.codeToHtml(
  'Pick<MyObject, string>[]',
  {
    lang: 'ts',
    theme: 'github-dark',
    grammarState: stateTypeAnnotation // <--- 这个
  }
)
```

现在 Shiki 将正确高亮，因为它知道要从类型注解开始。您还可以保留该语法状态对象以便多次使用。

<img width="223" alt="image" src="https://github.com/shikijs/shiki/assets/11247099/c896c2ae-2a88-428b-9d06-2d2552eaae8b">

### 语法上下文代码

对于一次性的语法上下文切换，我们也提供了通过 `grammarContextCode` 选项的简便方法：

```ts
const highlightedType = shiki.codeToHtml(
  'Pick<MyObject, string>[]',
  {
    lang: 'ts',
    theme: 'github-dark',
    grammarContextCode: 'let a:' // 与上述相同，内部创建一个临时语法状态
  }
)
```

### 从 HAST 获取语法状态

`getLastGrammarState` 方法在内部运行高亮过程并返回语法状态。如果您正在处理诸如可暂停高亮的内容，这可能会导致高亮执行两次。在这种情况下，您可以将高亮的 `hast` 节点传递给 `getLastGrammarState` 以获取我们在内部 WeakMap 中存储的语法状态：

```ts
const shiki = await getHighlighter(/* ... */)

const root = shiki.codeToHast(/* ... */)

const grammarState = shiki.getLastGrammarState(root) // 传递 hast 根节点而不是代码
```
