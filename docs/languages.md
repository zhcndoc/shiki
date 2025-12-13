# 语言

## 捆绑的语言

以下列出的语言语法来自 [`tm-grammars`](https://github.com/antfu/textmate-grammars-themes/tree/main/packages/tm-grammars)。

> [!NOTE]
> Shiki 并不控制或维护这些语法。如果你想为语法做出贡献，请参考 [`textmate-grammars-themes`](https://github.com/shikijs/textmate-grammars-themes#contribute)。

<LanguagesList />

语法由其各自仓库的许可证覆盖，这些许可证是宽松的（如 apache-2.0、mit 等），并在[本 NOTICE](https://github.com/shikijs/textmate-grammars-themes/blob/main/packages/tm-grammars/NOTICE) 中提供。

如果你要加载自定义语言，请参考[这个指南](/guide/load-lang)。

## 特殊的语言

### 纯文本

你可以将语言设置为 `text`，以绕过高亮显示。这可以作为处理用户指定了不可用语言时的回滚效果，例如：

```txt
import { codeToHtml } from 'shiki'

const html = codeToHtml('console.log("Hello World")', {
  lang: 'text', // [!code hl]
  theme: 'vitesse-light',
})
```

`txt` 和 `plain` 可以作为 `text` 的别名使用。

### ANSI

特殊的处理语言 `ansi` 可以用来突出显示终端输出。例如：

```ansi
[0;32mcolored foreground[0m
[0;42mcolored background[0m

[0;1mbold text[0m
[0;2mdimmed text[0m
[0;4munderlined text[0m
[0;7mreversed text[0m
[0;9mstrikethrough text[0m
[0;4;9munderlined + strikethrough text[0m
```

查看[上述代码片段的原始 Markdown](https://github.com/shikijs/shiki/blob/main/docs/languages.md?plain=1#L35)。
