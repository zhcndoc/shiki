# 主题

## 捆绑的主题

以下列出的主题来自 [`tm-themes`](https://github.com/antfu/textmate-grammars-themes/tree/main/packages/tm-themes)。

> [!NOTE]
> Shiki 并不控制或维护这些主题。如果你想为这些主题做出贡献，请参考 [`textmate-grammars-themes`](https://github.com/shikijs/textmate-grammars-themes#contribute)。

<ThemesList />

主题受其各自仓库的许可协议（如 apache-2.0、mit 等）约束，并在[此 NOTICE](https://github.com/shikijs/textmate-grammars-themes/blob/main/packages/tm-themes/NOTICE) 中提供。

如果你要加载自定义语言，请参考[这个指南](/guide/load-theme)。

## 特殊的主题

你可以将主题设置为 `none` 以绕过高亮显示。这可以作为处理用户指定了不可用主题时的回滚效果，例如：

```ts twoslash theme:none
// @twoslash-cache: {"v":1,"hash":"86ec614e5e60566b55ed222e8e581ca015d4e3a6c7f2bd3716fca6224c3c0fda","data":"N4Igdg9gJgpgziAXAbVAFwJ4AcZJACwgDcYAnEAGhDRgA808AKAQwBsBLZuASgAIBjCGDhoB0GABUIACTQBbVol6NBsJSNLswAcwq8IWNOyFwlAYXFTpXNAHlDx4QB4AQgFcwUVjCgAZZjpuzNoweu6e3lAS+DByMAB8fAC88bwACqQQcuxwME4aWtrxADpg7HJYEKSiqpIy8qyUICLM1UgAnFTeOmj4SACMAAxUaK0hDIggtVYNTRxguIjDU/itzPw05IjtAL4U6NiLBMRkTTT0eILCovgNShlZOXkFOvFNLW2IACwATF0wPT63xGYxgEwIsy6WkWfxWaw2p0QADY9gccHhCCRyCM6OCWBwuHxpvUFCpxOo0JodHoDEYTOZLDIbPY6c5wl4fP5AsFQrx2ZForEEtx7plsrl8pTCiUyhUqjVGbIFO9Rp8vp0QN1tL0BstVeNLorIZroUhYfxVqR1psBgBmVHUQ4Yk7Y6i4phYTI4aoYPisALaJTFEAAK2YRC4/E0hmDKtaE3aX3+gKQSeooPB/p0c1NiFtVAt8JtiB+Dsw6MmmNOOIuk0YnoMZEwfAssBZjjgAGVCt5BXFXB4OVEYnF4gA6XpCpR9mAAJRg2hylOYrIAgmAMLwAD68TtSnS+dibNgAVTKQgHER8M70LyKcc+/X6SOT2qBAFYQaQDZNJ3EcwsqYFpa1qIqWAC6BbiHg5SVNUvDAGIsAzAovA7LwABmYq8AA5HA+DsAA1uwOGlKUVwiLwtyoUkSF1EqrCMDhFEQN4Y6sBA2iMMG0gwKwHG8AA6lUrBQMG3A4XowClLwvBZoGuFhhGcBRuwhiSTJvB/jASg4ZACySbwAD0Rm8MgACEtRUaw4GlDs3BNHEoxIKAuIAnAjh4GgCA7DsQA"}
import { codeToHtml } from 'shiki'

const html = codeToHtml('console.log("Hello World")', {
  lang: 'javascript',
  theme: 'none', // [!code hl]
})
```

