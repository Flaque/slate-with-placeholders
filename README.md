# slate-with-placeholders [![License](https://img.shields.io/npm/l/slate-with-placeholders.svg)](https://github.com/flaque/slate-with-placeholders/blob/master/package.json)

Adds custom placeholders that you can put in any block. Example:

![screenshot of multiple placeholders](https://i.imgur.com/w15XsKH.png)

## Install

```
yarn add slate-with-placeholders
```

## Usage

This plugin is technically two plugins, one that adds a placeholder as a [decoration](https://docs.slatejs.org/slate-core/decoration) and one that renders the placeholder.

The first plugin `withPlaceholders` looks for block types that it should render placeholders in.

```jsx
import { withPlaceholders, renderPlaceholders } from "slate-with-placeholders";

const BLOCKS_TYPES_WITH_PLACEHOLDERS = ["text-field", "number-field"];

const plugins = [
  withPlaceholders({
    types: BLOCKS_TYPES_WITH_PLACEHOLDERS
  }),
  renderPlaceholders()
];

// ...

<Editor plugins={plugins} {/* ... */}>
```
