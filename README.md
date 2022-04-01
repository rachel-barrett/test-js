# test-js

This is a minimal javascript library for unit testing.

## Example Usage

(This example uses typescript, and assumes you have [ts-node](https://www.npmjs.com/package/ts-node) as a dev dependency, but you could just as easily use javascript with node.)

Save the library to your project as a dev dependency, with:
```
npm install --save-dev @rlb53/test
```

Create a `test` directory. Create an `index.ts` file in it, with contents:

```ts
//index.ts

import * as test from "@rlb53/test";

import "./TestSuite1";

test.results();

```

Create a test suite file, also in the `test` directory e.g.

```ts
//TestSuite1.ts

import {suite, group, test, assertEquals} from "@rlb53/test";

suite(module.filename)(() => {
    group("function foo should:")(() => {
        test("return succes when bar")(() => {
            const expected = 1;
            const actual = 2;

            console.log("log anything helpful for debugging");

            return assertEquals<number>({ expected, actual });
        });
    });
});

```

Add a `test` key to your package.json `scripts` key, that runs:

```
cd test; ts-node index.ts
```

Then you can run your tests with:
```
npm test
```
