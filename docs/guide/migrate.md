---
outline: deep
---

# 迁移

我们建议您逐步迁移，按照每个版本的迁移指南进行操作。

## 从 v2.0 迁移

如果您在 v2.0 上且在使用中没有警告，您应该能够直接升级到 v3.0，详细信息请阅读 [Shiki v3.0](/blog/v3)。

## 从 v1.0 迁移

我们建议您首先 [迁移到 v2.0](/blog/v2)，然后再迁移到 v3.0。

## 从 v0.14 迁移

Shiki 的 v1.0 版本是一次重大的重写，我们利用这个机会重新审视了过去做出的每一个设计决策。我们最初有一个单独的包名 [Shikiji](https://github.com/antfu/shikiji) 来实验新的设计，现在它已合并回 Shiki，成为 v1.0。

> [!TIP] 了解更多
> 有兴趣了解 v1.0 背后的故事吗？请查看这篇 [博客文章](https://nuxt.com/blog/shiki-v1) 获取更多细节。

与 [`shiki@0.14.3`](https://github.com/shikijs/shiki/releases/tag/v0.14.3) 相比，破坏性变更的列表如下：

### 硬性破坏性变更

需要手动迁移的破坏性变更：

- CJS 和 IIFE 构建已被弃用。有关详细信息，请参见 [CJS 使用](/guide/install#cjs-usage) 和 [CDN 使用](/guide/install#cdn-usage)。
- `codeToHtml` 在内部使用 [`hast`](https://github.com/syntax-tree/hast)。生成的 HTML 会稍有不同，但应该表现相同。
- 不再支持 `css-variables` 主题。请改用 [双主题](/guide/dual-themes) 方法，或在 [主题颜色处理](/guide/theme-colors) 页面了解更多信息。

### 软性破坏性变更

破坏性变更适用于主包 `shiki`，但通过 [兼容构建 `@shikijs/compat`](/guide/compat#compatibility-build) 进行了兼容处理：

- 顶层命名导出 `setCDN`、`loadLanguage`、`loadTheme`、`setWasm` 已被弃用，因为不再需要。
- `BUNDLED_LANGUAGES`、`BUNDLED_THEMES` 已移至 `@shikijs/langs` 和 `@shikijs/themes`，并分别重命名为 `bundledLanguages` 和 `bundledThemes`。
- `createHighlighter` 的 `theme` 选项已被弃用，请改为使用包含数组的 `themes`。
- Highlighter 不再维护内部默认主题上下文。`codeToHtml` 和 `codeToTokens` 需要 `theme` 选项。
- `codeToThemedTokens` 被重命名为 `codeToTokensBase`，并添加了更高级别的 `codeToTokens`。
- `codeToTokens` 默认将 `includeExplanation` 设置为 `false`。
- `.ansiToHtml` 已作为特殊语言 `ansi` 合并到 `.codeToHtml` 中。请改用 `.codeToHtml(code, { lang: 'ansi' })`。
- `lineOptions` 已被弃用，取而代之的是完全可自定义的 `transforms` 选项。
- `LanguageRegistration` 的 `grammar` 字段被扁平化为 `LanguageRegistration` 本身，更多详细信息请参阅类型定义。

### 生态系统包

- `shiki-twoslash` 已完全重写。它不再是 Shiki 高亮器的封装，而是一个 Shiki 转换器，可以集成到支持 Shiki 转换器的任何集成中。该包现在为 [`@shikijs/twoslash`](/packages/twoslash)。
- `shiki-twoslash` 的集成，例如 `gatsby-remark-shiki-twoslash` 等，将慢慢迁移到通用的 Shiki 版本。在此之前，您可以使用 [`@shikijs/rehype`](/packages/rehype) 或 [`@shikijs/markdown-it`](/packages/markdown-it) 将 Shiki 集成到这些元框架中。
- 引入了新的官方集成，如 [`@shikijs/monaco`](/packages/monaco)、[`@shikijs/cli`](/packages/cli)、[`@shikijs/rehype`](/packages/rehype)、[`@shikijs/markdown-it`](/packages/markdown-it)。
- 由于使用率低，`shiki-renderer-path` 和 `shiki-renderer-svg` 包正在被弃用。如果需要这些包，请提交一个问题并指出您的使用案例，我们愿意考虑重新引入。
- `vuepress-plugin-shiki` 被弃用，因为 [VuePress](https://github.com/vuejs/vuepress#status) 不再推荐。它的继任者 [VitePress](https://vitepress.zhcndoc.com/) 内置了 Shiki 集成。

## 从 Shikiji 迁移

如果您已经在使用 [Shikiji](https://github.com/antfu/shikiji)，首先确保您使用的是最新的小版本 v0.10。然后通过重命名包，迁移将非常简单：

- `shikiji` -> `shiki`
- `shikiji-core` -> `@shikijs/core`
- `shikiji-twoslash` -> `@shikijs/twoslash`
- `shikiji-transformers` -> `@shikijs/transformers`
- `shikiji-monaco` -> `@shikijs/monaco`
- `shikiji-cli` -> `@shikijs/cli`
- `markdown-it-shikiji` -> `@shikijs/markdown-it`
- `rehype-shikiji` -> `@shikijs/rehype`
