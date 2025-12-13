# @shikijs/cli

<Badges name="@shikijs/cli" />

命令行中的 Shiki。

## 使用方法

Shiki CLI 的使用方式类似 `cat` 命令，但带有语法高亮。
它也支持远程文件。

```bash
npx @shikijs/cli README.md
```

```bash
npx @shikijs/cli \
  'https://github.com/shikijs/shiki/blob/main/taze.config.ts?raw=true'
```

## 安装

你也可以全局安装。命令别名 `@shikijs/cli`、`shiki`、`skat` 会被注册。

::: code-group

```sh [npm]
npm i -g @shikijs/cli
```

```sh [yarn]
yarn global add @shikijs/cli
```

```sh [pnpm]
pnpm add -g @shikijs/cli
```

```sh [bun]
bun add -g @shikijs/cli
```

```sh [deno]
deno install -gREn skat npm:@shikijs/cli
```

:::

```sh
skat src/index.ts
```

## 选项

### `--theme`

指定要使用的主题。默认是 `vitesse-dark`。

```bash
npx @shikijs/cli README.md --theme=nord
```

### `--lang`

语言会从文件扩展名自动推断。你可以用 `--lang` 覆盖。

```bash
npx @shikijs/cli src/index.js --lang=ts
```

### `--format`

指定输出格式。默认是 `ansi`。
支持的值：`ansi`，`html`。

```bash
npx @shikijs/cli README.md --format=html
```

## Node.js API

`@shikijs/cli` 包也提供 Node.js API。

::: code-group

```sh [npm]
npm i @shikijs/cli
```

```sh [yarn]
yarn add @shikijs/cli
```

```sh [pnpm]
pnpm add @shikijs/cli
```

```sh [bun]
bun add @shikijs/cli
```

```sh [deno]
deno add npm:@shikijs/cli
```

:::

### `codeToANSI`

异步函数 `codeToANSI` 允许你将代码转换为供终端输出使用的 ANSI 转义码。
这对于在终端渲染带有语法高亮的代码非常有用。

```ts
import { codeToANSI } from '@shikijs/cli'

const highlighted = await codeToANSI(source, 'typescript', 'nord')

console.log(highlighted)
```

`codeToANSI` 接收三个必需参数：

1. `code: string`
2. `lang: BundledLanguage`
3. `theme: BundledTheme`