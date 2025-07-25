---
outline: deep
---

# 深浅色模式

Shiki 支持输出浅色和深色两个主题。与 [markdown-it-shiki](https://github.com/antfu/markdown-it-shiki#dark-mode) 将代码渲染两次的实现不同，Shiki 的多主题实现使用 CSS 变量来存储每个标签上的颜色；其在性能上更高效，并且包更小。

将 `codeToHtml` 中的 `theme` 选项更改为 `themes`，并使用 `light` 和 `dark` 键以生成两个主题。

```ts twoslash
import { codeToHtml } from 'shiki'

const code = await codeToHtml('console.log("hello")', {
  lang: 'javascript',
  themes: { // [!code hl:4]
    light: 'min-light',
    dark: 'nord',
  }
})
```

这会生成以下 HTML ([示例预览](https://htmlpreview.github.io/?https://raw.githubusercontent.com/shikijs/shiki/main/packages/shiki/test/out/dual-themes.html))：

```html
<pre
  class="shiki shiki-themes min-light nord"
  style="background-color:#ffffff;--shiki-dark-bg:#2e3440ff;color:#24292eff;--shiki-dark:#d8dee9ff"
  tabindex="0"
>
  <code>
    <span class="line">
      <span style="color:#1976D2;--shiki-dark:#D8DEE9">console</span>
      <span style="color:#6F42C1;--shiki-dark:#ECEFF4">.</span>
      <span style="color:#6F42C1;--shiki-dark:#88C0D0">log</span>
      <span style="color:#24292EFF;--shiki-dark:#D8DEE9FF">(</span>
      <span style="color:#22863A;--shiki-dark:#ECEFF4">"</span>
      <span style="color:#22863A;--shiki-dark:#A3BE8C">hello</span>
      <span style="color:#22863A;--shiki-dark:#ECEFF4">"</span>
      <span style="color:#24292EFF;--shiki-dark:#D8DEE9FF">)</span>
      </span>
    </code>
</pre>
```

为了使它们响应你的网站颜色模式，需要加入一些额外的 CSS 片段：

## 基于媒体查询的深色模式

```css
@media (prefers-color-scheme: dark) {
  .shiki,
  .shiki span {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
    /* 可选，用于定义字体样式 */
    font-style: var(--shiki-dark-font-style) !important;
    font-weight: var(--shiki-dark-font-weight) !important;
    text-decoration: var(--shiki-dark-text-decoration) !important;
  }
}
```

## 基于类名的深色模式

```css
html.dark .shiki,
html.dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
  /* 可选，用于定义字体样式 */
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}
```

## 多主题

还支持超过两个主题。在 `theme` 对象中，你可以创建任意数量的主题，并使用 `defaultColor` 选项指定默认主题。

```ts twoslash
import { codeToHtml } from 'shiki'

const code = await codeToHtml('console.log("hello")', {
  lang: 'javascript',
  themes: {
    light: 'github-light',
    dark: 'github-dark',
    dim: 'github-dimmed',
    // 任意数量的主题
  },

  // 可选的自定义选项
  defaultColor: 'light',
  cssVariablePrefix: '--shiki-'
})
```

`span` 令牌将使用相应主题的 CSS 变量生成：

```html
<span style="color:#1976D2;--shiki-dark:#D8DEE9;--shiki-dim:#566575">console</span>
```

之后，您需要在具有 `shiki` 类的元素及其下的令牌上应用主题的 CSS 变量，例如，基于父元素的 `data-theme` 属性：

```css
[data-theme='dark'] .shiki,
[data-theme='dark'] .shiki span {
  background-color: var(--s-dark-bg) !important;
  color: var(--s-dark) !important;
}

[data-theme='dim'] .shiki,
[data-theme='dim'] .shiki span {
  background-color: var(--s-dim-bg) !important;
  color: var(--s-dim) !important;
}
```

[示例预览](https://htmlpreview.github.io/?https://raw.githubusercontent.com/shikijs/shiki/main/packages/shiki/test/out/multiple-themes.html)

### 不使用默认颜色

如果你想完全控制颜色或避免使用 `!important` 进行覆盖，你可以将 `defaultColor` 设置为 `false` 来禁用默认颜色。

```ts twoslash
import { codeToHtml } from 'shiki'

const code = await codeToHtml('console.log("hello")', {
  lang: 'javascript',
  themes: {
    light: 'vitesse-light',
    dark: 'vitesse-dark',
  },
  defaultColor: false, // <--
})
```

此时，标签会以类似如下形式生成：

```html
<span style="--shiki-dark:#D8DEE9;--shiki-light:#2E3440">console</span>
```

在这种情况下，生成的 HTML 将没有默认样式，你需要添加自己的 CSS 来控制它们的颜色。

也可以通过 CSS 变量来控制主题。更多内容，请参考 [@mayank99](https://github.com/mayank99) 在 [这个问题 #6](https://github.com/antfu/shikiji/issues/6) 中的深入研究和示例。

## `light-dark()` 函数

你也可以使用 [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark) 函数来避免手动维护 CSS 变量。

将 `defaultColor` 设置为特殊值 `light-dark()` 以使用它。使用此方法时，需要同时提供 `light` 和 `dark` 主题。

```ts twoslash
import { codeToHtml } from 'shiki'

const code = await codeToHtml('console.log("hello")', {
  lang: 'javascript',
  themes: {
    light: 'min-light',
    dark: 'nord',
  },
  defaultColor: 'light-dark()', // [!code hl]
})
```

:::info 兼容性注意
`light-dark()` 函数相对较新，可能不被旧浏览器支持。[Can I use?](https://caniuse.com/?search=css-light-dark)
:::