# JavaScript RegExp 引擎兼容性参考

所有内置语法与 [JavaScript RegExp 引擎](/guide/regex-engines#javascript-regexp-engine) 的兼容性参考。

> Generated on Saturday, August 2, 2025
>
> 版本 `3.9.1`
>
> 运行环境：Node.js v23.11.0

## 报告摘要

|          |                        计数 |
| :------- | --------------------------: |
| 总语言数 |                         222 |
| 支持     | [222](#supported-languages) |
| 不匹配   |  [0](#mismatched-languages) |
| 不支持   | [0](#unsupported-languages) |

## 支持的语言

与 JavaScript RegExp 引擎兼容的语言，并且将产生与 WASM 引擎相同的结果（使用 [注册表中的示例代码片段](https://github.com/shikijs/textmate-grammars-themes/tree/main/samples)）。
在某些边缘情况下，不能保证高亮显示会完全相同。如果发生这种情况，请创建一个包含示例代码片段的问题。

| Language           | Highlight Match | Patterns Parsable | Patterns Failed | Diff |
| ------------------ | :-------------- | ----------------: | --------------: | ---: |
| abap               | ✅ OK           |                52 |               - |      |
| actionscript-3     | ✅ OK           |                57 |               - |      |
| ada                | ✅ OK           |               200 |               - |      |
| angular-html       | ✅ OK           |               669 |               - |      |
| angular-ts         | ✅ OK           |               776 |               - |      |
| apache             | ✅ OK           |                60 |               - |      |
| apex               | ✅ OK           |               186 |               - |      |
| apl                | ✅ OK           |               912 |               - |      |
| applescript        | ✅ OK           |               152 |               - |      |
| ara                | ✅ OK           |                54 |               - |      |
| asciidoc           | ✅ OK           |               262 |               - |      |
| asm                | ✅ OK           |               298 |               - |      |
| astro              | ✅ OK           |               610 |               - |      |
| awk                | ✅ OK           |                36 |               - |      |
| ballerina          | ✅ OK           |               224 |               - |      |
| bash               | ✅ OK           |               147 |               - |      |
| bat                | ✅ OK           |                58 |               - |      |
| beancount          | ✅ OK           |                39 |               - |      |
| berry              | ✅ OK           |                18 |               - |      |
| bibtex             | ✅ OK           |                19 |               - |      |
| bicep              | ✅ OK           |                27 |               - |      |
| blade              | ✅ OK           |              1120 |               - |      |
| bsl                | ✅ OK           |                96 |               - |      |
| c                  | ✅ OK           |               176 |               - |      |
| cadence            | ✅ OK           |                71 |               - |      |
| cairo              | ✅ OK           |               236 |               - |      |
| clarity            | ✅ OK           |                42 |               - |      |
| clj                | ✅ OK           |                38 |               - |      |
| clojure            | ✅ OK           |                38 |               - |      |
| cmake              | ✅ OK           |                23 |               - |      |
| cobol              | ✅ OK           |               858 |               - |      |
| codeowners         | ✅ OK           |                 4 |               - |      |
| codeql             | ✅ OK           |               147 |               - |      |
| coffee             | ✅ OK           |               466 |               - |      |
| common-lisp        | ✅ OK           |                60 |               - |      |
| coq                | ✅ OK           |                27 |               - |      |
| cpp                | ✅ OK           |               506 |               - |      |
| crystal            | ✅ OK           |              1054 |               - |      |
| csharp             | ✅ OK           |               301 |               - |      |
| css                | ✅ OK           |               141 |               - |      |
| csv                | ✅ OK           |                 1 |               - |      |
| cue                | ✅ OK           |                85 |               - |      |
| cypher             | ✅ OK           |                39 |               - |      |
| d                  | ✅ OK           |               272 |               - |      |
| dart               | ✅ OK           |                75 |               - |      |
| dax                | ✅ OK           |                23 |               - |      |
| desktop            | ✅ OK           |                16 |               - |      |
| diff               | ✅ OK           |                16 |               - |      |
| docker             | ✅ OK           |                 7 |               - |      |
| dotenv             | ✅ OK           |                 9 |               - |      |
| dream-maker        | ✅ OK           |                56 |               - |      |
| edge               | ✅ OK           |               629 |               - |      |
| elixir             | ✅ OK           |               704 |               - |      |
| elm                | ✅ OK           |               241 |               - |      |
| emacs-lisp         | ✅ OK           |               153 |               - |   22 |
| erb                | ✅ OK           |              1764 |               - |      |
| erlang             | ✅ OK           |               265 |               - |      |
| fennel             | ✅ OK           |                31 |               - |      |
| fish               | ✅ OK           |                25 |               - |      |
| fluent             | ✅ OK           |                23 |               - |      |
| fortran-fixed-form | ✅ OK           |               330 |               - |      |
| fortran-free-form  | ✅ OK           |               326 |               - |      |
| fsharp             | ✅ OK           |               238 |               - |      |
| fsl                | ✅ OK           |                30 |               - |      |
| gdresource         | ✅ OK           |               157 |               - |      |
| gdscript           | ✅ OK           |                94 |               - |      |
| gdshader           | ✅ OK           |                39 |               - |      |
| genie              | ✅ OK           |                20 |               - |      |
| gherkin            | ✅ OK           |                19 |               - |      |
| gleam              | ✅ OK           |                26 |               - |      |
| glimmer-js         | ✅ OK           |               673 |               - |      |
| glimmer-ts         | ✅ OK           |               673 |               - |      |
| glsl               | ✅ OK           |               185 |               - |      |
| gnuplot            | ✅ OK           |                82 |               - |      |
| go                 | ✅ OK           |               126 |               - |      |
| graphql            | ✅ OK           |               445 |               - |      |
| groovy             | ✅ OK           |               130 |               - |      |
| hack               | ✅ OK           |               941 |               - |      |
| haml               | ✅ OK           |               559 |               - |      |
| handlebars         | ✅ OK           |               696 |               - |      |
| haskell            | ✅ OK           |               157 |               - |      |
| haxe               | ✅ OK           |               173 |               - |      |
| hcl                | ✅ OK           |                67 |               - |      |
| hjson              | ✅ OK           |                57 |               - |      |
| hlsl               | ✅ OK           |                52 |               - |      |
| html               | ✅ OK           |               608 |               - |      |
| http               | ✅ OK           |               746 |               - |      |
| hxml               | ✅ OK           |               181 |               - |      |
| hy                 | ✅ OK           |                12 |               - |      |
| imba               | ✅ OK           |               239 |               - |      |
| ini                | ✅ OK           |                11 |               - |      |
| java               | ✅ OK           |               141 |               - |      |
| javascript         | ✅ OK           |               375 |               - |      |
| jinja              | ✅ OK           |               639 |               - |      |
| jison              | ✅ OK           |               431 |               - |      |
| json               | ✅ OK           |                19 |               - |      |
| json5              | ✅ OK           |                23 |               - |      |
| jsonc              | ✅ OK           |                19 |               - |      |
| jsonl              | ✅ OK           |                19 |               - |      |
| jsonnet            | ✅ OK           |                33 |               - |      |
| jssm               | ✅ OK           |                30 |               - |      |
| jsx                | ✅ OK           |               375 |               - |      |
| julia              | ✅ OK           |              1167 |               - |      |
| kotlin             | ✅ OK           |                58 |               - |      |
| kusto              | ✅ OK           |                60 |               - |      |
| latex              | ✅ OK           |               327 |               - |      |
| lean               | ✅ OK           |                32 |               - |      |
| less               | ✅ OK           |               279 |               - |      |
| liquid             | ✅ OK           |               689 |               - |      |
| llvm               | ✅ OK           |                25 |               - |      |
| log                | ✅ OK           |                31 |               - |      |
| logo               | ✅ OK           |                 9 |               - |      |
| lua                | ✅ OK           |               276 |               - |      |
| luau               | ✅ OK           |                88 |               - |      |
| make               | ✅ OK           |                51 |               - |      |
| markdown           | ✅ OK           |               118 |               - |      |
| marko              | ✅ OK           |               929 |               - |      |
| matlab             | ✅ OK           |                88 |               - |      |
| mdc                | ✅ OK           |               780 |               - |      |
| mdx                | ✅ OK           |               197 |               - |      |
| mermaid            | ✅ OK           |               138 |               - |      |
| mipsasm            | ✅ OK           |                17 |               - |      |
| mojo               | ✅ OK           |               213 |               - |      |
| move               | ✅ OK           |               116 |               - |      |
| narrat             | ✅ OK           |                34 |               - |      |
| nextflow           | ✅ OK           |                32 |               - |      |
| nginx              | ✅ OK           |               375 |               - |      |
| nim                | ✅ OK           |              1117 |               - |      |
| nix                | ✅ OK           |                80 |               - |      |
| nushell            | ✅ OK           |                85 |               - |      |
| objective-c        | ✅ OK           |               222 |               - |      |
| objective-cpp      | ✅ OK           |               306 |               - |      |
| ocaml              | ✅ OK           |               178 |               - |      |
| pascal             | ✅ OK           |                23 |               - |      |
| perl               | ✅ OK           |               937 |               - |      |
| php                | ✅ OK           |              1124 |               - |      |
| plsql              | ✅ OK           |                45 |               - |      |
| po                 | ✅ OK           |                23 |               - |      |
| polar              | ✅ OK           |                31 |               - |      |
| postcss            | ✅ OK           |                49 |               - |      |
| powerquery         | ✅ OK           |                30 |               - |      |
| powershell         | ✅ OK           |                88 |               - |      |
| prisma             | ✅ OK           |                28 |               - |      |
| prolog             | ✅ OK           |                26 |               - |      |
| proto              | ✅ OK           |                33 |               - |      |
| pug                | ✅ OK           |               683 |               - |      |
| puppet             | ✅ OK           |                60 |               - |      |
| purescript         | ✅ OK           |                87 |               - |      |
| python             | ✅ OK           |               218 |               - |      |
| qml                | ✅ OK           |               407 |               - |      |
| qmldir             | ✅ OK           |                 7 |               - |      |
| qss                | ✅ OK           |                31 |               - |      |
| r                  | ✅ OK           |                85 |               - |      |
| racket             | ✅ OK           |                69 |               - |      |
| raku               | ✅ OK           |                52 |               - |      |
| razor              | ✅ OK           |               941 |               - |      |
| reg                | ✅ OK           |                 9 |               - |      |
| regexp             | ✅ OK           |                34 |               - |      |
| rel                | ✅ OK           |                17 |               - |      |
| riscv              | ✅ OK           |                36 |               - |      |
| rst                | ✅ OK           |              2005 |               - |      |
| ruby               | ✅ OK           |              1756 |               - |      |
| rust               | ✅ OK           |                89 |               - |      |
| sas                | ✅ OK           |               100 |               - |      |
| sass               | ✅ OK           |                69 |               - |      |
| scala              | ✅ OK           |               116 |               - |      |
| scheme             | ✅ OK           |                34 |               - |      |
| scss               | ✅ OK           |               233 |               - |      |
| sdbl               | ✅ OK           |                23 |               - |      |
| shaderlab          | ✅ OK           |                87 |               - |      |
| shellscript        | ✅ OK           |               147 |               - |      |
| shellsession       | ✅ OK           |               149 |               - |      |
| smalltalk          | ✅ OK           |                44 |               - |      |
| solidity           | ✅ OK           |               103 |               - |      |
| soy                | ✅ OK           |               646 |               - |      |
| sparql             | ✅ OK           |                19 |               - |      |
| splunk             | ✅ OK           |                17 |               - |      |
| sql                | ✅ OK           |                68 |               - |      |
| ssh-config         | ✅ OK           |                12 |               - |      |
| stata              | ✅ OK           |               254 |               - |      |
| stylus             | ✅ OK           |               106 |               - |      |
| svelte             | ✅ OK           |               642 |               - |      |
| swift              | ✅ OK           |               334 |               - |      |
| system-verilog     | ✅ OK           |               102 |               - |      |
| systemd            | ✅ OK           |                32 |               - |      |
| talonscript        | ✅ OK           |                46 |               - |      |
| tasl               | ✅ OK           |                23 |               - |      |
| tcl                | ✅ OK           |                34 |               - |      |
| templ              | ✅ OK           |               674 |               - |      |
| terraform          | ✅ OK           |                68 |               - |      |
| tex                | ✅ OK           |               120 |               - |      |
| toml               | ✅ OK           |                44 |               - |      |
| ts-tags            | ✅ OK           |               990 |               - |      |
| tsv                | ✅ OK           |                 1 |               - |      |
| tsx                | ✅ OK           |               375 |               - |      |
| turtle             | ✅ OK           |                15 |               - |      |
| twig               | ✅ OK           |              2391 |               - |      |
| typescript         | ✅ OK           |               362 |               - |      |
| typespec           | ✅ OK           |                73 |               - |      |
| typst              | ✅ OK           |                78 |               - |      |
| v                  | ✅ OK           |                78 |               - |      |
| vala               | ✅ OK           |                20 |               - |      |
| vb                 | ✅ OK           |                34 |               - |      |
| verilog            | ✅ OK           |                33 |               - |      |
| vhdl               | ✅ OK           |                82 |               - |      |
| viml               | ✅ OK           |                72 |               - |      |
| vue                | ✅ OK           |               690 |               - |      |
| vue-html           | ✅ OK           |               714 |               - |      |
| vue-vine           | ✅ OK           |              1203 |               - |      |
| vyper              | ✅ OK           |               238 |               - |      |
| wasm               | ✅ OK           |                78 |               - |      |
| wenyan             | ✅ OK           |                18 |               - |      |
| wgsl               | ✅ OK           |                44 |               - |      |
| wikitext           | ✅ OK           |               105 |               - |      |
| wit                | ✅ OK           |                81 |               - |      |
| wolfram            | ✅ OK           |               501 |               - |      |
| xml                | ✅ OK           |               168 |               - |      |
| xsl                | ✅ OK           |               170 |               - |      |
| yaml               | ✅ OK           |                48 |               - |      |
| zenscript          | ✅ OK           |                21 |               - |      |
| zig                | ✅ OK           |                51 |               - |      |
| zsh                | ✅ OK           |               147 |               - |      |

###### 表格字段说明

- **Highlight Match**: 高亮显示结果是否与 WASM 引擎匹配（使用 [注册表中的示例代码片段](https://github.com/shikijs/textmate-grammars-themes/tree/main/samples)）。
- **Patterns Parsable**: JavaScript RegExp 引擎可以解析的正则表达式模式数量。
- **Patterns Failed**: JavaScript RegExp 引擎无法解析的正则表达式模式数量（抛出错误）。
- **Diff**: 两个引擎高亮显示结果中不同字符的长度。

## 不匹配的语言

不与 JavaScript RegExp 引擎兼容的语言，但会产生与 WASM 引擎不同的结果。

| Language | Highlight Match | Patterns Parsable | Patterns Failed | Diff |
| -------- | :-------------- | ----------------: | --------------: | ---: |

## 不支持的语言

与 JavaScript RegExp 引擎不兼容的语言，因为它们包含我们无法填充的语法，或者因为语法包含无效的 Oniguruma 正则表达式（在 WASM 引擎中也会失败，但会静默失败）。您可以尝试这些语言，使用 `forgiving` 选项跳过错误。

| Language | Highlight Match | Patterns Parsable | Patterns Failed | Diff |
| -------- | :-------------- | ----------------: | --------------: | ---: |
