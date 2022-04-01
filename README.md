# test-js

This is a minimal javascript library for unit testing.

## example usage

(This example uses typescript but you could just as easily use javascript.)

Create a `test` directory with an `index.ts` file init with contents

```ts
//index.ts

import * as test from "test"

import "./TestSuite1"

test.results()
```

Create a test suite file e.g.

```ts
//TestSuite1.ts

import {suite, group, test, assertEquals} from "test"

suite(module.filename)(() => {
  group("function foo should", () => {
    test("return succes when bar")(() => {
      const expected = 1;
      const actual = 2;

      console.log("log anything helpful for debugging")

      assertEquals<number>({expect, actual})
      
    })
  })
})
```

Add a `test` key to your package.json that runs:

```
cd test; ts-node index.ts
```


