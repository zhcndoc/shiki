# JavaScript RegExp 引擎兼容性参考

所有内置语法与 [JavaScript RegExp 引擎](/guide/regex-engines#javascript-regexp-engine-experimental) 的兼容性参考。

> 生成于 2024年11月15日，星期五
>
> 版本 `1.23.0`
>
> 运行环境：Node.js v20.18.0

## 报告摘要

|                 |                        计数 |
| :-------------- | ---------------------------: |
| 总语言数       |                          214 |
| 支持           |  [178](#supported-languages) |
| 不匹配         |  [18](#mismatched-languages) |
| 不支持         | [18](#unsupported-languages) |

## 支持的语言

与 JavaScript RegExp 引擎兼容的语言，并且将产生与 WASM 引擎相同的结果（使用 [注册处中的示例代码段](https://github.com/shikijs/textmate-grammars-themes/tree/main/samples)）。
在某些边缘案例中，不能保证高亮显示与 WASM 引擎完全相同。如果发生这种情况，请创建一个带有示例代码段的问题。

| 语言               | 高亮匹配 | 可解析模式数 | 失败模式数 | 差异 |
| ------------------ | :------ | ------------: | ----------: | ---: |
| abap               | ✅ OK   |             51 |           - |      |
| actionscript-3     | ✅ OK   |             57 |           - |      |
| angular-html       | ✅ OK   |            670 |           - |      |
| angular-ts         | ✅ OK   |            779 |           - |      |
| apache             | ✅ OK   |             60 |           - |      |
| apl                | ✅ OK   |            917 |           - |      |
| applescript        | ✅ OK   |            152 |           - |      |
| ara                | ✅ OK   |             54 |           - |      |
| asciidoc           | ✅ OK   |            262 |           - |      |
| asm                | ✅ OK   |            297 |           - |      |
| astro              | ✅ OK   |            613 |           - |      |
| awk                | ✅ OK   |             36 |           - |      |
| ballerina          | ✅ OK   |            230 |           - |      |
| bat                | ✅ OK   |             58 |           - |      |
| berry              | ✅ OK   |             18 |           - |      |
| bibtex             | ✅ OK   |             19 |           - |      |
| bicep              | ✅ OK   |             27 |           - |      |
| cadence            | ✅ OK   |             71 |           - |      |
| clarity            | ✅ OK   |             43 |           - |      |
| clj                | ✅ OK   |             38 |           - |      |
| clojure            | ✅ OK   |             38 |           - |      |
| cmake              | ✅ OK   |             23 |           - |      |
| cobol              | ✅ OK   |            864 |           - |      |
| codeowners         | ✅ OK   |              4 |           - |      |
| codeql             | ✅ OK   |            151 |           - |      |
| coffee             | ✅ OK   |            469 |           - |      |
| common-lisp        | ✅ OK   |             60 |           - |      |
| coq                | ✅ OK   |             25 |           - |      |
| css                | ✅ OK   |            141 |           - |      |
| csv                | ✅ OK   |              1 |           - |      |
| cue                | ✅ OK   |             85 |           - |      |
| cypher             | ✅ OK   |             39 |           - |      |
| d                  | ✅ OK   |            270 |           - |      |
| dart               | ✅ OK   |             72 |           - |      |
| dax                | ✅ OK   |             23 |           - |      |
| desktop            | ✅ OK   |             16 |           - |      |
| diff               | ✅ OK   |             16 |           - |      |
| docker             | ✅ OK   |              7 |           - |      |
| dotenv             | ✅ OK   |              9 |           - |      |
| dream-maker        | ✅ OK   |             56 |           - |      |
| edge               | ✅ OK   |            632 |           - |      |
| elm                | ✅ OK   |            244 |           - |      |
| emacs-lisp         | ✅ OK   |            153 |           - |   22 |
| erb                | ✅ OK   |           1312 |           - |      |
| fennel             | ✅ OK   |             31 |           - |      |
| fish               | ✅ OK   |             25 |           - |      |
| fluent             | ✅ OK   |             23 |           - |      |
| fortran-fixed-form | ✅ OK   |            332 |           - |      |
| fortran-free-form  | ✅ OK   |            328 |           - |      |
| fsl                | ✅ OK   |             30 |           - |      |
| gdresource         | ✅ OK   |            157 |           - |      |
| gdscript           | ✅ OK   |             93 |           - |      |
| gdshader           | ✅ OK   |             39 |           - |      |
| genie              | ✅ OK   |             20 |           - |      |
| gherkin            | ✅ OK   |             19 |           - |      |
| gleam              | ✅ OK   |             26 |           - |      |
| glimmer-js         | ✅ OK   |            676 |           - |      |
| glimmer-ts         | ✅ OK   |            676 |           - |      |
| gnuplot            | ✅ OK   |             82 |           - |      |
| go                 | ✅ OK   |            123 |           - |      |
| graphql            | ✅ OK   |            448 |           - |      |
| groovy             | ✅ OK   |            133 |           - |      |
| haml               | ✅ OK   |            562 |           - |      |
| handlebars         | ✅ OK   |            699 |           - |      |
| haxe               | ✅ OK   |            174 |           - |      |
| hcl                | ✅ OK   |             67 |           - |      |
| hjson              | ✅ OK   |             57 |           - |      |
| hlsl               | ✅ OK   |             52 |           - |      |
| html               | ✅ OK   |            611 |           - |      |
| http               | ✅ OK   |            753 |           - |      |
| hxml               | ✅ OK   |            182 |           - |      |
| hy                 | ✅ OK   |             12 |           - |      |
| imba               | ✅ OK   |            516 |           - |      |
| ini                | ✅ OK   |             11 |           - |      |
| java               | ✅ OK   |            142 |           - |      |
| javascript         | ✅ OK   |            376 |           - |      |
| jinja              | ✅ OK   |            642 |           - |      |
| jison              | ✅ OK   |            421 |           - |      |
| json               | ✅ OK   |             19 |           - |      |
| json5              | ✅ OK   |             23 |           - |      |
| jsonc              | ✅ OK   |             19 |           - |      |
| jsonl              | ✅ OK   |             19 |           - |      |
| jsonnet            | ✅ OK   |             33 |           - |      |
| jssm               | ✅ OK   |             30 |           - |      |
| jsx                | ✅ OK   |            376 |           - |      |
| latex              | ✅ OK   |            283 |           - |      |
| lean               | ✅ OK   |             32 |           - |      |
| less               | ✅ OK   |            280 |           - |      |
| liquid             | ✅ OK   |            684 |           - |      |
| log                | ✅ OK   |             30 |           - |      |
| logo               | ✅ OK   |              9 |           - |      |
| lua                | ✅ OK   |            278 |           - |      |
| luau               | ✅ OK   |             88 |           - |      |
| make               | ✅ OK   |             51 |           - |      |
| marko              | ✅ OK   |            926 |           - |      |
| matlab             | ✅ OK   |             88 |           - |      |
| mipsasm            | ✅ OK   |             17 |           - |      |
| mojo               | ✅ OK   |            213 |           - |      |
| move               | ✅ OK   |            120 |           - |      |
| narrat             | ✅ OK   |             34 |           - |      |
| nextflow           | ✅ OK   |             17 |           - |      |
| nginx              | ✅ OK   |            378 |           - |      |
| nix                | ✅ OK   |             80 |           - |      |
| nushell            | ✅ OK   |             81 |           - |      |
| objective-c        | ✅ OK   |            223 |           - |      |
| ocaml              | ✅ OK   |            178 |           - |      |
| pascal             | ✅ OK   |             23 |           - |      |
| perl               | ✅ OK   |            941 |           - |      |
| plsql              | ✅ OK   |             45 |           - |      |
| postcss            | ✅ OK   |             49 |           - |      |
| powerquery         | ✅ OK   |             30 |           - |      |
| powershell         | ✅ OK   |             88 |           - |      |
| prisma             | ✅ OK   |             26 |           - |      |
| prolog             | ✅ OK   |             26 |           - |      |
| proto              | ✅ OK   |             33 |           - |      |
| puppet             | ✅ OK   |             61 |           - |      |
| python             | ✅ OK   |            218 |           - |      |
| qml                | ✅ OK   |            408 |           - |      |
| qmldir             | ✅ OK   |              7 |           - |      |
| qss                | ✅ OK   |             31 |           - |      |
| r                  | ✅ OK   |             71 |           - |      |
| racket             | ✅ OK   |             69 |           - |      |
| raku               | ✅ OK   |             52 |           - |      |
| reg                | ✅ OK   |              9 |           - |      |
| regexp             | ✅ OK   |             34 |           - |      |
| rel                | ✅ OK   |             17 |           - |      |
| riscv              | ✅ OK   |             36 |           - |      |
| rust               | ✅ OK   |             89 |           - |      |
| sas                | ✅ OK   |            101 |           - |      |
| sass               | ✅ OK   |             69 |           - |      |
| scala              | ✅ OK   |            117 |           - |      |
| scheme             | ✅ OK   |             34 |           - |      |
| scss               | ✅ OK   |            234 |           - |      |
| shaderlab          | ✅ OK   |             87 |           - |      |
| shellsession       | ✅ OK   |            150 |           - |      |
| solidity           | ✅ OK   |            102 |           - |      |
| soy                | ✅ OK   |            649 |           - |      |
| sparql             | ✅ OK   |             19 |           - |      |
| splunk             | ✅ OK   |             17 |           - |      |
| sql                | ✅ OK   |             67 |           - |      |
| ssh-config         | ✅ OK   |             12 |           - |      |
| stata              | ✅ OK   |            253 |           - |      |
| stylus             | ✅ OK   |            107 |           - |      |
| svelte             | ✅ OK   |            636 |           - |      |
| system-verilog     | ✅ OK   |            102 |           - |      |
| systemd            | ✅ OK   |             32 |           - |      |
| tasl               | ✅ OK   |             23 |           - |      |
| tcl                | ✅ OK   |             34 |           - |      |
| templ              | ✅ OK   |            673 |           - |      |
| terraform          | ✅ OK   |             68 |           - |      |
| tex                | ✅ OK   |            106 |           - |      |
| toml               | ✅ OK   |             44 |           - |      |
| ts-tags            | ✅ OK   |            997 |           - |      |
| tsv                | ✅ OK   |              1 |           - |      |
| tsx                | ✅ OK   |            376 |           - |      |
| turtle             | ✅ OK   |             15 |           - |      |
| twig               | ✅ OK   |           1984 |           - |      |
| typescript         | ✅ OK   |            363 |           - |      |
| typespec           | ✅ OK   |             80 |           - |      |
| typst              | ✅ OK   |             78 |           - |      |
| v                  | ✅ OK   |             80 |           - |      |
| vala               | ✅ OK   |             20 |           - |      |
| vb                 | ✅ OK   |             34 |           - |      |
| verilog            | ✅ OK   |             33 |           - |      |
| vhdl               | ✅ OK   |             82 |           - |      |
| viml               | ✅ OK   |             72 |           - |      |
| vue                | ✅ OK   |            692 |           - |      |
| vue-html           | ✅ OK   |            716 |           - |      |
| vyper              | ✅ OK   |            238 |           - |      |
| wasm               | ✅ OK   |             78 |           - |      |
| wenyan             | ✅ OK   |             18 |           - |      |
| wgsl               | ✅ OK   |             44 |           - |      |
| wikitext           | ✅ OK   |            104 |           - |      |
| xml                | ✅ OK   |            169 |           - |      |
| xsl                | ✅ OK   |            171 |           - |      |
| yaml               | ✅ OK   |             48 |           - |      |
| zenscript          | ✅ OK   |             21 |           - |      |
| zig                | ✅ OK   |             51 |           - |      |

###### 表格字段说明

- **高亮匹配**: 高亮结果是否与 WASM 引擎针对 [示例代码段](https://github.com/shikijs/textmate-grammars-themes/tree/main/samples) 匹配。
- **可解析模式数**: JavaScript RegExp 引擎可以解析的正则表达式模式数量。
- **失败模式数**: 无法被 JavaScript RegExp 引擎解析的正则表达式模式数量（抛出错误）。
- **差异**: 两个引擎高亮结果之间不一样的字符长度。

## 不匹配的语言

在 JavaScript RegExp 引擎中不会抛出错误，但将产生与 WASM 引擎不同的结果。请谨慎使用。

| 语言              | 高亮匹配                                                                    | 可解析模式数 | 失败模式数 | 差异 |
| ----------------- | :-------------------------------------------------------------------------- | ------------: | ----------: | ---: |
| bash              | [🚧 不匹配](https://textmate-grammars-themes.netlify.app/?grammar=bash)    |            148 |           - |   56 |
| beancount         | [🚧 不匹配](https://textmate-grammars-themes.netlify.app/?grammar=beancount) |             39 |           - |  171 |
| c                 | [🚧 不匹配](https://textmate-grammars-themes.netlify.app/?grammar=c)        |            177 |           - |  209 |
| crystal           | [🚧 不匹配](https://textmate-grammars-themes.netlify.app/?grammar=crystal)  |           1067 |           - |   40 |
| elixir            | [🚧 不匹配](https://textmate-grammars-themes.netlify.app/?grammar=elixir)   |            708 |           - |  179 |
| erlang            | [🚧 不匹配](https://textmate-grammars-themes.netlify.app/?grammar=erlang)   |            147 |           - |  470 |
| glsl              | [🚧 不匹配](https://textmate-grammars-themes.netlify.app/?grammar=glsl)     |            186 |           - |  306 |
| kotlin            | [🚧 不匹配](https://textmate-grammars-themes.netlify.app/?grammar=kotlin)   |             58 |           - | 1953 |
| kusto             | [🚧 不匹配](https://textmate-grammars-themes.netlify.app/?grammar=kusto)    |             60 |           - |   40 |
| mermaid           | [🚧 不匹配](https://textmate-grammars-themes.netlify.app/?grammar=mermaid)  |            129 |           - |   38 |
| objective-cpp     | [🚧 不匹配](https://textmate-grammars-themes.netlify.app/?grammar=objective-cpp) |            309 |           - |  172 |
| php               | [🚧 不匹配](https://textmate-grammars-themes.netlify.app/?grammar=php)      |           1131 |           - |  605 |
| po                | [🚧 不匹配](https://textmate-grammars-themes.netlify.app/?grammar=po)       |             23 |           - |  423 |
| pug               | [🚧 不匹配](https://textmate-grammars-themes.netlify.app/?grammar=pug)      |            686 |           - |  164 |
| ruby              | [🚧 不匹配](https://textmate-grammars-themes.netlify.app/?grammar=ruby)     |           1307 |           - |    1 |
| shellscript       | [🚧 不匹配](https://textmate-grammars-themes.netlify.app/?grammar=shellscript) |            148 |           - |   56 |
| smalltalk         | [🚧 不匹配](https://textmate-grammars-themes.netlify.app/?grammar=smalltalk) |             35 |           - |   40 |
| zsh               | [🚧 不匹配](https://textmate-grammars-themes.netlify.app/?grammar=zsh)      |            148 |           - |  117 |

## 不支持的语言

因语法的原因（例如包含我们尚未能填充的语法），或因语法包含无效的 Oniguruma 正则表达式（在使用 WASM 引擎时同样会失败，但不抛出错误），而导致在 JavaScript RegExp 引擎中抛出错误的语言。你可以尝试使用 `forgiving` 选项来跳过错误，但通常最好使用 Oniguruma 引擎。

| 语言        | 高亮匹配                                                          | 可解析模式数 | 失败模式数 | 差异 |
| ----------- | :--------------------------------------------------------------- | ------------: | ----------: | ---: |
| ada         | ✅ OK                                                            |            201 |           1 |      |
| blade       | ✅ OK                                                            |           1125 |           1 |      |
| fsharp      | ✅ OK                                                            |            234 |           5 |      |
| nim         | ✅ OK                                                            |           1121 |           5 |      |
| julia       | ✅ OK                                                            |           1147 |          21 |      |
| rst         | [🚧 不匹配](https://textmate-grammars-themes.netlify.app/?grammar=rst) |           1836 |          21 |   62 |
| hack        | ❌ 错误                                                           |            947 |           1 |  114 |
| haskell     | ❌ 错误                                                           |            156 |           1 |  143 |
| wolfram     | ❌ 错误                                                           |            500 |           1 |   12 |
| purescript  | ❌ 错误                                                           |             71 |           2 |   36 |
| swift       | ❌ 错误                                                           |            326 |           3 |   40 |
| mdx         | ❌ 错误                                                           |            193 |           4 |      |
| markdown    | ❌ 错误                                                           |            113 |           5 |  193 |
| mdc         | ❌ 错误                                                           |            778 |           6 |  389 |
| apex        | ❌ 错误                                                           |            175 |          12 |  269 |
| cpp         | ❌ 错误                                                           |            491 |          21 |   25 |
| csharp      | ❌ 错误                                                           |            281 |          28 |  207 |
| razor       | ❌ 错误                                                           |            927 |          30 |   26 |