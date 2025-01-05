# JavaScript RegExp 引擎兼容性参考

所有内置语法与 [JavaScript RegExp 引擎](/guide/regex-engines#javascript-regexp-engine) 的兼容性参考。

> Generated on Thursday, January 2, 2025
>
> 版本 `1.24.4`
>
> 运行环境：Node.js v20.18.0

## 报告摘要

|          |                        计数 |
| :------- | --------------------------: |
| 总语言数 |                         219 |
| 支持     | [213](#supported-languages) |
| 不匹配   |  [1](#mismatched-languages) |
| 不支持   | [5](#unsupported-languages) |

## 支持的语言

与 JavaScript RegExp 引擎兼容的语言，并且将产生与 WASM 引擎相同的结果（使用 [注册表中的示例代码片段](https://github.com/shikijs/textmate-grammars-themes/tree/main/samples)）。
在某些边缘情况下，不能保证高亮显示会完全相同。如果发生这种情况，请创建一个包含示例代码片段的问题。

| Language           | Highlight Match | Patterns Parsable | Patterns Failed | Diff |
| ------------------ | :-------------- | ----------------: | --------------: | ---: |
| abap               | ✅ OK           |                52 |               - |      |
| actionscript-3     | ✅ OK           |                57 |               - |      |
| ada                | ✅ OK           |               201 |               - |      |
| angular-html       | ✅ OK           |               670 |               - |      |
| angular-ts         | ✅ OK           |               779 |               - |      |
| apache             | ✅ OK           |                60 |               - |      |
| apex               | ✅ OK           |               187 |               - |      |
| apl                | ✅ OK           |               917 |               - |      |
| applescript        | ✅ OK           |               152 |               - |      |
| ara                | ✅ OK           |                54 |               - |      |
| asciidoc           | ✅ OK           |               262 |               - |      |
| asm                | ✅ OK           |               297 |               - |      |
| astro              | ✅ OK           |               613 |               - |      |
| awk                | ✅ OK           |                36 |               - |      |
| ballerina          | ✅ OK           |               230 |               - |      |
| bash               | ✅ OK           |               148 |               - |      |
| bat                | ✅ OK           |                58 |               - |      |
| beancount          | ✅ OK           |                39 |               - |      |
| berry              | ✅ OK           |                18 |               - |      |
| bibtex             | ✅ OK           |                19 |               - |      |
| bicep              | ✅ OK           |                27 |               - |      |
| blade              | ✅ OK           |              1126 |               - |      |
| bsl                | ✅ OK           |                96 |               - |      |
| c                  | ✅ OK           |               177 |               - |      |
| cadence            | ✅ OK           |                71 |               - |      |
| cairo              | ✅ OK           |               236 |               - |      |
| clarity            | ✅ OK           |                43 |               - |      |
| clj                | ✅ OK           |                38 |               - |      |
| clojure            | ✅ OK           |                38 |               - |      |
| cmake              | ✅ OK           |                23 |               - |      |
| cobol              | ✅ OK           |               863 |               - |      |
| codeowners         | ✅ OK           |                 4 |               - |      |
| codeql             | ✅ OK           |               151 |               - |      |
| coffee             | ✅ OK           |               469 |               - |      |
| common-lisp        | ✅ OK           |                60 |               - |      |
| coq                | ✅ OK           |                26 |               - |      |
| cpp                | ✅ OK           |               512 |               - |      |
| crystal            | ✅ OK           |              1067 |               - |      |
| css                | ✅ OK           |               141 |               - |      |
| csv                | ✅ OK           |                 1 |               - |      |
| cue                | ✅ OK           |                85 |               - |      |
| cypher             | ✅ OK           |                39 |               - |      |
| d                  | ✅ OK           |               270 |               - |      |
| dart               | ✅ OK           |                76 |               - |      |
| dax                | ✅ OK           |                23 |               - |      |
| desktop            | ✅ OK           |                16 |               - |      |
| diff               | ✅ OK           |                16 |               - |      |
| docker             | ✅ OK           |                 7 |               - |      |
| dotenv             | ✅ OK           |                 9 |               - |      |
| dream-maker        | ✅ OK           |                56 |               - |      |
| edge               | ✅ OK           |               632 |               - |      |
| elixir             | ✅ OK           |               708 |               - |      |
| elm                | ✅ OK           |               244 |               - |      |
| emacs-lisp         | ✅ OK           |               153 |               - |   22 |
| erb                | ✅ OK           |              1786 |               - |      |
| erlang             | ✅ OK           |               147 |               - |      |
| fennel             | ✅ OK           |                31 |               - |      |
| fish               | ✅ OK           |                25 |               - |      |
| fluent             | ✅ OK           |                23 |               - |      |
| fortran-fixed-form | ✅ OK           |               332 |               - |      |
| fortran-free-form  | ✅ OK           |               328 |               - |      |
| fsharp             | ✅ OK           |               239 |               - |      |
| fsl                | ✅ OK           |                30 |               - |      |
| gdresource         | ✅ OK           |               158 |               - |      |
| gdscript           | ✅ OK           |                94 |               - |      |
| gdshader           | ✅ OK           |                39 |               - |      |
| genie              | ✅ OK           |                20 |               - |      |
| gherkin            | ✅ OK           |                19 |               - |      |
| gleam              | ✅ OK           |                26 |               - |      |
| glimmer-js         | ✅ OK           |               676 |               - |      |
| glimmer-ts         | ✅ OK           |               676 |               - |      |
| glsl               | ✅ OK           |               186 |               - |      |
| gnuplot            | ✅ OK           |                82 |               - |      |
| go                 | ✅ OK           |               125 |               - |      |
| graphql            | ✅ OK           |               448 |               - |      |
| groovy             | ✅ OK           |               133 |               - |      |
| haml               | ✅ OK           |               562 |               - |      |
| handlebars         | ✅ OK           |               699 |               - |      |
| haskell            | ✅ OK           |               157 |               - |      |
| haxe               | ✅ OK           |               174 |               - |      |
| hcl                | ✅ OK           |                67 |               - |      |
| hjson              | ✅ OK           |                57 |               - |      |
| hlsl               | ✅ OK           |                52 |               - |      |
| html               | ✅ OK           |               611 |               - |      |
| http               | ✅ OK           |               753 |               - |      |
| hxml               | ✅ OK           |               182 |               - |      |
| hy                 | ✅ OK           |                12 |               - |      |
| imba               | ✅ OK           |               516 |               - |      |
| ini                | ✅ OK           |                11 |               - |      |
| java               | ✅ OK           |               142 |               - |      |
| javascript         | ✅ OK           |               376 |               - |      |
| jinja              | ✅ OK           |               642 |               - |      |
| jison              | ✅ OK           |               421 |               - |      |
| json               | ✅ OK           |                19 |               - |      |
| json5              | ✅ OK           |                23 |               - |      |
| jsonc              | ✅ OK           |                19 |               - |      |
| jsonl              | ✅ OK           |                19 |               - |      |
| jsonnet            | ✅ OK           |                33 |               - |      |
| jssm               | ✅ OK           |                30 |               - |      |
| jsx                | ✅ OK           |               376 |               - |      |
| julia              | ✅ OK           |              1168 |               - |      |
| kotlin             | ✅ OK           |                58 |               - |      |
| kusto              | ✅ OK           |                60 |               - |      |
| latex              | ✅ OK           |               283 |               - |      |
| lean               | ✅ OK           |                32 |               - |      |
| less               | ✅ OK           |               280 |               - |      |
| liquid             | ✅ OK           |               689 |               - |      |
| log                | ✅ OK           |                31 |               - |      |
| logo               | ✅ OK           |                 9 |               - |      |
| lua                | ✅ OK           |               278 |               - |      |
| luau               | ✅ OK           |                88 |               - |      |
| make               | ✅ OK           |                51 |               - |      |
| markdown           | ✅ OK           |               118 |               - |      |
| marko              | ✅ OK           |               926 |               - |      |
| matlab             | ✅ OK           |                88 |               - |      |
| mdc                | ✅ OK           |               783 |               - |      |
| mdx                | ✅ OK           |               197 |               - |      |
| mermaid            | ✅ OK           |               134 |               - |      |
| mipsasm            | ✅ OK           |                17 |               - |      |
| mojo               | ✅ OK           |               213 |               - |      |
| move               | ✅ OK           |               120 |               - |      |
| narrat             | ✅ OK           |                34 |               - |      |
| nextflow           | ✅ OK           |                32 |               - |      |
| nim                | ✅ OK           |              1126 |               - |      |
| nix                | ✅ OK           |                80 |               - |      |
| nushell            | ✅ OK           |                81 |               - |      |
| objective-c        | ✅ OK           |               223 |               - |      |
| objective-cpp      | ✅ OK           |               309 |               - |      |
| ocaml              | ✅ OK           |               178 |               - |      |
| pascal             | ✅ OK           |                23 |               - |      |
| perl               | ✅ OK           |               941 |               - |      |
| php                | ✅ OK           |              1131 |               - |      |
| plsql              | ✅ OK           |                45 |               - |      |
| po                 | ✅ OK           |                23 |               - |      |
| polar              | ✅ OK           |                30 |               - |      |
| postcss            | ✅ OK           |                49 |               - |      |
| powerquery         | ✅ OK           |                30 |               - |      |
| powershell         | ✅ OK           |                88 |               - |      |
| prisma             | ✅ OK           |                28 |               - |      |
| prolog             | ✅ OK           |                26 |               - |      |
| proto              | ✅ OK           |                33 |               - |      |
| pug                | ✅ OK           |               686 |               - |      |
| puppet             | ✅ OK           |                61 |               - |      |
| python             | ✅ OK           |               218 |               - |      |
| qml                | ✅ OK           |               408 |               - |      |
| qmldir             | ✅ OK           |                 7 |               - |      |
| qss                | ✅ OK           |                31 |               - |      |
| r                  | ✅ OK           |                71 |               - |      |
| racket             | ✅ OK           |                69 |               - |      |
| raku               | ✅ OK           |                52 |               - |      |
| reg                | ✅ OK           |                 9 |               - |      |
| regexp             | ✅ OK           |                34 |               - |      |
| rel                | ✅ OK           |                17 |               - |      |
| riscv              | ✅ OK           |                36 |               - |      |
| rst                | ✅ OK           |              2031 |               - |      |
| ruby               | ✅ OK           |              1781 |               - |      |
| rust               | ✅ OK           |                89 |               - |      |
| sas                | ✅ OK           |               101 |               - |      |
| sass               | ✅ OK           |                69 |               - |      |
| scala              | ✅ OK           |               117 |               - |      |
| scheme             | ✅ OK           |                34 |               - |      |
| scss               | ✅ OK           |               234 |               - |      |
| sdbl               | ✅ OK           |                23 |               - |      |
| shaderlab          | ✅ OK           |                87 |               - |      |
| shellscript        | ✅ OK           |               148 |               - |      |
| shellsession       | ✅ OK           |               150 |               - |      |
| smalltalk          | ✅ OK           |                35 |               - |      |
| solidity           | ✅ OK           |               102 |               - |      |
| soy                | ✅ OK           |               649 |               - |      |
| sparql             | ✅ OK           |                19 |               - |      |
| splunk             | ✅ OK           |                17 |               - |      |
| sql                | ✅ OK           |                67 |               - |      |
| ssh-config         | ✅ OK           |                12 |               - |      |
| stata              | ✅ OK           |               253 |               - |      |
| stylus             | ✅ OK           |               107 |               - |      |
| svelte             | ✅ OK           |               637 |               - |      |
| system-verilog     | ✅ OK           |               102 |               - |      |
| systemd            | ✅ OK           |                32 |               - |      |
| talonscript        | ✅ OK           |                44 |               - |      |
| tasl               | ✅ OK           |                23 |               - |      |
| tcl                | ✅ OK           |                34 |               - |      |
| templ              | ✅ OK           |               675 |               - |      |
| terraform          | ✅ OK           |                68 |               - |      |
| tex                | ✅ OK           |               106 |               - |      |
| toml               | ✅ OK           |                44 |               - |      |
| ts-tags            | ✅ OK           |               997 |               - |      |
| tsv                | ✅ OK           |                 1 |               - |      |
| tsx                | ✅ OK           |               376 |               - |      |
| turtle             | ✅ OK           |                15 |               - |      |
| twig               | ✅ OK           |              2426 |               - |      |
| typescript         | ✅ OK           |               363 |               - |      |
| typespec           | ✅ OK           |                80 |               - |      |
| typst              | ✅ OK           |                78 |               - |      |
| v                  | ✅ OK           |                80 |               - |      |
| vala               | ✅ OK           |                20 |               - |      |
| vb                 | ✅ OK           |                34 |               - |      |
| verilog            | ✅ OK           |                33 |               - |      |
| vhdl               | ✅ OK           |                82 |               - |      |
| viml               | ✅ OK           |                72 |               - |      |
| vue                | ✅ OK           |               694 |               - |      |
| vue-html           | ✅ OK           |               718 |               - |      |
| vyper              | ✅ OK           |               238 |               - |      |
| wasm               | ✅ OK           |                78 |               - |      |
| wenyan             | ✅ OK           |                18 |               - |      |
| wgsl               | ✅ OK           |                44 |               - |      |
| wikitext           | ✅ OK           |               104 |               - |      |
| wolfram            | ✅ OK           |               501 |               - |      |
| xml                | ✅ OK           |               169 |               - |      |
| xsl                | ✅ OK           |               171 |               - |      |
| yaml               | ✅ OK           |                48 |               - |      |
| zenscript          | ✅ OK           |                21 |               - |      |
| zig                | ✅ OK           |                51 |               - |      |
| zsh                | ✅ OK           |               148 |               - |      |

###### 表格字段说明

- **Highlight Match**: 高亮显示结果是否与 WASM 引擎匹配（使用 [注册表中的示例代码片段](https://github.com/shikijs/textmate-grammars-themes/tree/main/samples)）。
- **Patterns Parsable**: JavaScript RegExp 引擎可以解析的正则表达式模式数量。
- **Patterns Failed**: JavaScript RegExp 引擎无法解析的正则表达式模式数量（抛出错误）。
- **Diff**: 两个引擎高亮显示结果中不同字符的长度。

## 不匹配的语言

不与 JavaScript RegExp 引擎兼容的语言，但会产生与 WASM 引擎不同的结果。请谨慎使用。

| Language | Highlight Match                                                            | Patterns Parsable | Patterns Failed | Diff |
| -------- | :------------------------------------------------------------------------- | ----------------: | --------------: | ---: |
| nginx    | [🚧 Mismatch](https://textmate-grammars-themes.netlify.app/?grammar=nginx) |               378 |               - |  122 |

## 不支持的语言

与 JavaScript RegExp 引擎不兼容的语言，因为它们包含我们无法填充的语法，或者因为语法包含无效的 Oniguruma 正则表达式（在 WASM 引擎中也会失败，但会静默失败）。您可以尝试这些语言，使用 `forgiving` 选项跳过错误。

| Language   | Highlight Match | Patterns Parsable | Patterns Failed | Diff |
| ---------- | :-------------- | ----------------: | --------------: | ---: |
| hack       | ❌ Error        |               947 |               1 |  114 |
| purescript | ❌ Error        |                72 |               1 |      |
| csharp     | ❌ Error        |               306 |               3 |  137 |
| swift      | ❌ Error        |               326 |               3 |    8 |
| razor      | ❌ Error        |               952 |               5 |      |
