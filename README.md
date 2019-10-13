<div align="center">

<h1>Async Status</h1>
<p>A standardized way to express asynchronous state in a synchronous manner ⏱</p>

[![npm version](https://img.shields.io/npm/v/async-status.svg)](https://www.npmjs.com/package/async-status)
[![build status](https://travis-ci.org/piotr-oles/async-status.svg?branch=master)](https://travis-ci.org/piotr-oles/async-status)
[![coverage status](https://coveralls.io/repos/github/piotr-oles/async-status/badge.svg?branch=master)](https://coveralls.io/github/piotr-oles/async-status?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![coverage status](https://coveralls.io/repos/github/piotr-oles/async-status/badge.svg?branch=master)](https://coveralls.io/github/piotr-oles/async-status?branch=master)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![npm license](https://img.shields.io/npm/l/async-status.svg)](https://www.npmjs.com/package/async-status)

</div>

## Table of Contents 📋

- [Installation 📦](#installation)
- [Concept 💡](#concept)
- [API reference 📖](#api-reference)
- [Typings 📐](#typings)
- [License](#license)

## Installation 📦

```sh
npm install --save async-status
```

This assumes that you’re using [npm](http://npmjs.com/) package manager with a module bundler like
[Webpack](https://webpack.js.org/) to consume [ES6](https://webpack.js.org/api/module-methods/#es6-recommended) or
[CommonJS](https://webpack.js.org/api/module-methods/#commonjs) modules.

## Concept 💡

The goal of this package is to provide a unified and standardized representation of asynchronous status.
It helps to integrate other libraries that translate asynchronous state to synchronous state
(for example [Redux](https://redux.js.org/)).
Instead of using different flags like `isLoading`, `isPending`, `hasError`, this library represents asynchronous status
as a one-variable - status.

There are 4 possible statuses:

- `AsyncStatus.IDLE` ⚫️ - means that nothing happens - it's the initial status
- `AsyncStatus.PENDING` ⏳ - means that async action is pending
- `AsyncStatus.RESOLVED` ✅ - means that async action has been successfully finished
- `AsyncStatus.REJECTED` ❌ - means that an error occurred during async action

There are no constraints about transitions between given statuses.

To give a better understanding of the relationship between `AsyncStatus` and asynchronous code let's try with real code:

```typescript
import AsyncStatus from "async-status";

const state = {
  status: AsyncStatus.IDLE
};

function fetchUsers() {
  state.status = AsyncStatus.PENDING;

  fetch("/api/user")
    .then(response => response.json())
    .then(data => {
      state.data = data;
      state.status = AsyncStatus.RESOLVED;
    })
    .catch(error => {
      state.error = error;
      state.status = AsyncStatus.REJECTED;
    });
}

fetchUsers();
```

As you can see, you don't have to introduce any boolean flags like `isPending` 👌

## API reference 📖

The status is a primitive value - string or undefined.

```typescript
AsyncStatus.IDLE = undefined;
AsyncStatus.PENDING = "PENDING";
AsyncStatus.RESOLVED = "RESOLVED";
AsyncStatus.REJECTED = "REJECTED";
```

#### `AsyncStatus.all(...statuses: AsyncStatus[]): AsyncStatus`

Combines many statuses into one status using an algorithm similar to `Promise.all` method.
Basically the algorithm is:

1.  if statuses list is empty, result = IDLE
2.  if one of the statuses is equal REJECTED, result = REJECTED
3.  if one of statuses is equal PENDING, result = PENDING
4.  if all statuses equal RESOLVED, result = RESOLVED
5.  in other cases, result = IDLE

#### `isAsyncStatus(candidate: any): candidate is AsyncStatus`

Checks if a given candidate is an `AsyncStatus` (means that it's equal `undefined` or `'PENDING'` or `'RESOLVED'` or `'REJECTED'`)

## Typings 📐

If you are using [TypeScript](https://www.typescriptlang.org/), typings are provided in the npm package.
This library doesn't provide [Flow](https://flow.org/) typings.

## License

MIT
