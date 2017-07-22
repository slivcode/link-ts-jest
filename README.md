# link-ts-jest

```
npm install link-ts-jest
# and then in your node project
link-ts-jest
```

link the npm global deps, without the wait to install `@types/jest`, `ts-jest`, `jest`, `ts-node`, `typescript` etc.

it also add the default to package.json 
```
{
  "jest": {
    "transform": {
      ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
    },
    "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js"
    ]
  }
}
```