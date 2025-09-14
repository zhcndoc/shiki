---
outline: deep
---

# 深浅色模式

Shiki 支持输出浅色和深色两个主题。与 [markdown-it-shiki](https://github.com/antfu/markdown-it-shiki#dark-mode) 将代码渲染两次的实现不同，Shiki 的多主题实现使用 CSS 变量来存储每个标签上的颜色；其在性能上更高效，并且包更小。

将 `codeToHtml` 中的 `theme` 选项更改为 `themes`，并使用 `light` 和 `dark` 键以生成两个主题。

```ts twoslash
// @twoslash-cache: {"v":1,"hash":"fb15f63f6dc6b9fd5783a292ff08dfdcee24e6bbd3d1aa6a716274a7dabac780","data":"N4Igdg9gJgpgziAXAbVAFwJ4AcZJACwgDcYAnEAGhDRgA808AKAQwBsBLZuASgAIBjCGDhoB0GABUIACTQBbVol6NBsJSNLswAcwq8IWNOyFwlAYXFTpXNAHlDx4QB4AQgFcwUVjCgAZZjpuzNoweu6e3lAS+DByMAB8fAC88bwACqQQcuxwME4aWtrxADpg7HJYEKSiqpIy8qyUICLM1UgAnFTeOmj4SACMAAxUaK0hDIggtVYNTRxguIjDU/itzPw05IjtAL4U6NiLBMRkTTT0eILCNeLqaJo6TS1tiAAsAExdMD19byNjMAmU3Ecy0i0+KzWG1OiAAbHsDjg8IQSOQRnQgSwOFw+NN6goVLdeAUdHoDEYTOZLDIbPYKc5wl4fP5AsFQrxGZForEEtwlBksjk8iSiqVypVqmJYDMFE9Ri8AKwKr4/AbLeXjS7U2SyrpgpAQ/irUjrTYDXb7aiHZEnNHUDFMLCZHDVDB8VgBbRKYogABWzCIXH4mkMPrlrQm7VeKu0vSQ0eoAKBHseeoWSAAzFQjVCzYh3girUjJijTuiLpNGE6DGRMHwLLA6Y44ABZNysIxYbzcuJwVweJlRGJxeIAOl6PNM6QjnFYTgASjBBKQoPl7oU9D2YIvtDl7sx6QBBMAYXgAH14AGV1zpfOxNmwAKplIT9iI+Ld6EXxH9NKAQfgEEmQ9eDkZgsH0AAzMRWCqXgwGYXteDQCBkOHeBR1KaIcl4NhYIAdzgXgMAgNxkNQuAcH4dhINPOR207bw0MnXhILgideBCBYTRoKApRgTCwFKAADUS0DgUp8HYbR8A4GTNlHPEdVYQlYD0YBSl4XgUy9XgAHJfTgPSKE05jeyUDSwC0rS5PwNAlD0oh73gXIAFpbLQYzTK0qBWgAawcpyaDgNzfNIPyvKs3gdlKHZuBE0TSlKAB1dhWFYTjvjIA8YEQJKwFE4S7IUUp8iwAJiUwbwkh9QRYNIRAAGJ+hagBuVzXLgKS/PYVywoCxrIKG1qfXiWonAAekogISgK0SzmCIDkGQZoYFwKg7LQLBTAmibd16NwACNFKyKbuvYQyzvYHrGo8/q+qCVhXInXsQAAXTeqhngmFrYRjOM4X+UhNUmF74FBdM/khE1oS2AtLUwYtjlRM4HUrasXTrbTpLs70QGyMB3JxtAwy++UfteP6QG6WNfmVRNgcBPAPIhxZ6ZzGG81eQtEaOUs7XOTEMdrN1eH6vHIBXUnmnJgYAHZlhpgGEw1JnJn61mkCpjnTRhbnPuBWA8HFKpRGAfiZQynZWMyOR9K6672D0/KrhEfjeCSXD8OYe8LfxFS9NdiBvFHWDtEYH0YnSiAfW4YzeEsmzPQc/1AzgYN2EMSKtLBqdzd23hkAAQlqXhZLeN7vOx+SHIJon5Oz6zxf0yWoEbmKwDipo4lGJBQAxb44EcPBxJAHYdiAA"}
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
// @twoslash-cache: {"v":1,"hash":"fc4926999e5a32603f3fe1811491316c0874c0696ffca08439884546f02a6c1e","data":"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"}
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
// @twoslash-cache: {"v":1,"hash":"a603cdb1558acfbd3d6826406395c067dd774f17d4cabe66cdbdf134dfb43376","data":"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"}
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
// @twoslash-cache: {"v":1,"hash":"6f759682435215e39c397b749acb7cde986e1a1443cd5d426f26280dae2d5214","data":"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"}
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