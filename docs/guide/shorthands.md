# 简写

使用 `shiki` 的更简单方法是使用提供的简写函数。这些函数会根据需要加载必要的主题和语言，并自动将它们缓存在内存中。与 `createHighlighter` 和 `createHighlighterCore` 不同，这些操作是异步的。

```ts twoslash
import { codeToHtml } from 'shiki'

const code = 'const a = 1' // 输入代码
const html = await codeToHtml(code, {
  lang: 'javascript',
  theme: 'vitesse-dark'
})

console.log(html) // 高亮的 HTML 字符串
```

## 使用细粒度捆绑创建简写

您可以使用细粒度捆绑来创建自己的简写。以下是使用细粒度捆绑创建简写的示例：

```ts
import { createdBundledHighlighter, createSingletonShorthands } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

const BundledLanguage = {
  typescript: () => import('@shikijs/langs/typescript'),
  javascript: () => import('@shikijs/langs/javascript'),
  vue: () => import('@shikijs/langs/vue'),
}

const BundledTheme = {
  'light-plus': () => import('@shikijs/themes/light-plus'),
  'dark-plus': () => import('@shikijs/themes/dark-plus'),
}

// 这会使用细粒度捆绑创建您的自定义 'createHighlighter' 函数
export const createHighlighter = /* @__PURE__ */ createdBundledHighlighter<
  BundledLanguage,
  BundledTheme
>({
  langs: bundledLanguages,
  themes: bundledThemes,
  engine: () => createJavaScriptRegexEngine(),
})

// 这会为您创建简写
export const {
  codeToHtml,
  codeToHast,
  codeToTokensBase,
  codeToTokens,
  codeToTokensWithThemes,
  getSingletonHighlighter,
  getLastGrammarState,
} = /* @__PURE__ */ createSingletonShorthands(
  createHighlighter,
)
```

您还可以使用 [`shiki-codegen`](/packages/codegen) 自动为您生成细粒度捆绑。
