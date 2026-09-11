# Decorations

We provide a decorations API allowing you to wrap custom classes and attributes around ranges of your code.

```ts twoslash
// @twoslash-cache: {"v":1,"hash":"ad050f718f888f34bc2e29d3975e0a0637dd197e8c39b6f65c54ee8d925fa178","data":"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"}
import { codeToHtml } from 'shiki'

const code = `
const x = 10
console.log(x)
`.trim()

const html = await codeToHtml(code, {
  theme: 'vitesse-light',
  lang: 'ts',
  decorations: [ // [!code hl:8]
    {
      // line and character are 0-indexed
      start: { line: 1, character: 0 },
      end: { line: 1, character: 11 },
      properties: { class: 'highlighted-word' }
    }
  ]
})
```

The result will be (styled with CSS in this example):

```ts
// @decorations:[{"start":{"line":1,"character":0},"end":{"line":1,"character":11},"properties":{"class":"highlighted-word"}}]
const x = 10
console.log(x)
```

The positions can also be 0-indexed offsets relative to the code:

```ts twoslash
// @twoslash-cache: {"v":1,"hash":"47fd17de08b4473e25bec5efb46f7c9a87fe8015e912d6600f80379a8aa88210","data":"N4Igdg9gJgpgziAXAbVAFwJ4AcZJACwgDcYAnEAGhDRgA808BjCMONAAnzQFsAbRdm1IBLMAHNKINgENSDRADYqvGOLT4kAFippZYmPII9ek3qNyIADFUb5Z0xjXKKAvhXTYLBYmUk16eAAU0mbScACU7MywACoQABLGgdEwAkKiYhTsEFhowixwAgDC0DBx8WFoAPK5+awAPABCAK5gUCpQADLS4s3S+lktbR0x+DDcMAB84QIACqQQ3MJwMPXp4pMAOmDC3FgQclGl5caSMnJIAIwAnMqqYupX1tR6BkzHCafK5kjPtvaOXyIG5uDw4PCEEjkHR0QzMVgcFJpNAicRnXQXRAAZmeKjUGkQ2hepH0cNKph+VhsdlIDicSBxoOonghPmh1FhQSwCxwcgwkRKsBqeQKAGUMipRuNVkN2jAoFKJpMAHTqaUCRUwABKMDEyxR0hFYAAgmAMOwAD7sUUojKdYROEIAVR2LCarTlCrGEyy6zEk3Rsnkmlx90eiAArDpXoY1RMKWALJdqQD6YgAExMzDgxDeKF+Tm5wLcnJkTCRXg9MQCTbUOC1wOYhRKEB4h4EokY0l4Sto76JpDplO0wHOTPuZk5vO+GEBIsl3nl9gAERgzFpRuFdTgytg68N24A/AJV/ujQBJGjcZAAXUt7A9MAAZuYoJIoBBGAhc0VmmxFuwe4HAeBTsGgEDsAA7rSWCcMIYj4GYCE0FAYEQAA1qocBQQ6+DKo28gAByhviVzJsS3a5kBG7bgmFhYsOdJAuOYJeJCM4cnOIDFjyZb8iua7AReV7KucaACFUT5Pis1SkLMEBwA6dTvp+34gDaQbZFJMnZKQ7D7IpRpaWBYyAYJNEsPhVBiVc6YMa2YYElGFFvLmNn9hYzn/COaYKFmLK5ux7L+IYPGlnykSnkJdSXuMyqqFAEnaQYVRyQpSksCpX54AAom0WnSQYun6elRkQE+JkwGZZ51FZUgYvIlwhncpHYtGJKuSACV0UgLbeUxzh+RO2ZsWyBZcWFi78VFFlgLF3DKguZbCPAx7sPM4V5PA96Pi+iZvlQH7ZbmG2Lit2HlZV7AwCoExgBw4FRKQMCGjAdU2cCEbOW24aXM8XadUtcjnT1iAAOyMaOvX+VOQXjaFQNLowlZwIUgi2n29VBlcCi3A5rXOQDcIowgHlIBDID9VDGaWC4N42OSubwmwnDGOwAC87DSJB0gOkcsSfHwySlFkwDbOwlUTAIADkRAOvAKwALRIVw0sUOL7C9tW7DS2gcBqxr1EgawAjIOwAD05vsMgACEKScPwYM3hrEti2AEse+jQYCOmyYux7CU+9o/sS4j50CMAUQkzL+DwYhccoYrkEHFA0vsC4/sZ+77DO2ALjhJIEy6EgoCwlhym5nrIAuC4QA=="}
import { codeToHtml } from 'shiki'

const code = `
const x = 10
console.log(x)
`.trim()
// ---cut---
const html = await codeToHtml(code, {
  theme: 'vitesse-light',
  lang: 'ts',
  decorations: [ // [!code hl:7]
    {
      start: 21,
      end: 24,
      properties: { class: 'highlighted-word' }
    }
  ]
})
```

It renders:

```ts
// @decorations:[{"start":21,"end":24,"properties":{"class":"highlighted-word"}}]
const x = 10
console.log(x)
```

Negative character positions denote characters from the end of a line, starting with the line end:

```ts twoslash
// @twoslash-cache: {"v":1,"hash":"f445be6013dcc1515a5189fe0a44669ee748465f55a6563c00cc29cd14e82b74","data":"N4Igdg9gJgpgziAXAbVAFwJ4AcZJACwgDcYAnEAGhDRgA808BjCMONAAgEsaBbRdgCIxmpAIZpOLAJK9KINqNINEANioAbGGADmafEgAsVNIu0xlIbjB5z1nMLkQAGKo3yLRjGuVUBfCujYjgTEZHI09HgAFKJ2onAAlFxg3gBmnjCCwhBiEtK8ADpgnDxYORxCIuKSYDLWcgpKSACMAEwaWrr6iM1G1KbmeJU51fn1GvaOLiBuHl5hPa3+gTh4hCTkxnQWUVikEDhKGEnDuTV1PAB0jWj8APKpqXDmd6QAChBw3DVyUBCMCEQIAAyiYlOwII9nhwcuwyl88mAIal2HpMrAqojLg0wcoAMx4jo6PRIACsxgGFhutkmLVc7jE8x8SwC1CCa1Cm2o22iewOZEwSQ+CJqlzsDn4YAArjwAEZhKjUxAGdogTTE7p9MFmCzi3ATBx0mYMzzeFrNZZs1ZA9YK7mRIG7faHQXsYXfFiXWaM7ySmXyrlK0nNIldJAATgppB1TBNTJphp69LmZsQrSclsw1pCG3CPMdfJdxyymPOvEuWig9yhL3enw9YF+/0BIAAomAoMinuYIaQ4fXEcjUfh0dkzp6cYplCpI2rOiTEIT+tHBkDKwnHKrvaaFiyVsFbVyIjtCwLi+6sXq/XK7UqAOxqOcawxRmNAvUbpBbuOp8OZ9k2pyeYOiATr8kcQoDqK25MteAaTk0iAABzkk+YaILO2qrsaKZ2h+abJj6CzNEh/7ZoewEns6Z4nGOoy1OWp5KJw8AAPz8G81HMfA7AAD7sFKHYwKkkxQE2AJ4Jx4ESDxkLDpkMCaDwWgcGgEDsIwpAwOIMDYoquItE4fTquhzTTFhFhMTJCAGo4S4wame5WgeQFbCBYFFkkjDqPEcD8GwpD2NoCHKM0JGhguqEWUwPlwDZaq0ouhE7j4zQqL4AC6rjQMEzCsBwVh8CWIyIhc7AALzsMARTsOwNz8MA7BXuwLgaT+ZD8E47D+DV7CVg1TWTJ1FBtbhpD8AAtM03UUL1VksX5VUabFi0AOT4Jw2j4HYW00FAE0AO45FAq3dUUvhyMpJhIKA2xaF8LB4GgCC+L4QA="}
import { DecorationItem } from 'shiki'
// ---cut---
const item: DecorationItem = {
  start: { line: 0, character: 0 },
  end: { line: 0, character: -1 },
  properties: { class: 'highlighted-word' }
}
```

This highlights the entire first line:

```ts
// @decorations:[{"start":{"line":0,"character":0},"end":{"line":0,"character":-1},"properties":{"class":"highlighted-word"}}]
const x = 10
console.log(x)
```

## Use Decorations in Transformers

For advanced use cases, you can use the [Transformers API](./transformers.md) to have full access to the tokens and the HAST tree.

Meanwhile, if you want to append decorations within a transformer, you can do that with:

```ts twoslash
// @twoslash-cache: {"v":1,"hash":"985b6e4a9fc89d935ed76617d4b84b1fe70fae36071f607ef8d8735e79019d1e","data":"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"}
import { DecorationItem } from 'shiki'

function doSomethingWithCode(code: string): DecorationItem[] {
  return []
}
const code: string = ''

// ---cut---
import { codeToHtml, ShikiTransformer } from 'shiki'

const myTransformer: ShikiTransformer = {
  name: 'my-transformer',
  preprocess(code, options) {
    // Generate the decorations somehow
    const decorations = doSomethingWithCode(code)

    // Make sure the decorations array exists
    options.decorations ||= []
    // Append the decorations
    options.decorations.push(...decorations)
  }
}

const html = await codeToHtml(code, {
  theme: 'vitesse-light',
  lang: 'ts',
  transformers: [
    myTransformer
  ]
})
```

Note that you can only provide decorations in or before the `preprocess` hook. In later hooks, changes to the decorations array will be ignored.
