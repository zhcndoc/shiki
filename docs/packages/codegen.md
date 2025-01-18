# shiki 代码生成

<Badges name="shiki-codegen" />

Shiki 的代码生成器用于创建专门针对您使用的优化包。

## Usage

### CLI

```bash
npx shiki-codegen \
  --langs typescript,javascript,vue \
  --themes light-plus,dark-plus \
  --engine javascript \
  ./shiki.bundle.ts
```

文件 `shiki.bundle.ts` 将被创建，您可以在项目中使用的代码。

然后您可以在项目中使用它：

```ts
import { codeToHtml } from './shiki.bundle'

const html = await codeToHtml(code, { lang: 'typescript', theme: 'light-plus' })
```

### 程序化

您还可以以编程方式使用 `shiki-codegen`，并将生成的代码写入文件：

```ts
import { codegen } from 'shiki-codegen'

const { code } = await codegen({
  langs: ['typescript', 'javascript', 'vue'],
  themes: ['light-plus', 'dark-plus'],
  engine: 'javascript',
  typescript: true
})

// 将代码写入文件
```
