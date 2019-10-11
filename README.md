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

The text comes from the block's [`data`](https://docs.slatejs.org/slate-core/block#data) attribute, which lets you create dynamic placeholder texts. To set this, just add `placeholderText` to the block in question:
```jsx
import { Value } from 'slate';

const value = Value.fromJS({
  document: {
    object: "document",
    nodes: [
      { 
        object: "block",
        type: "text-field",
        data: {
          placeholderText: "my custom placeholder text"
        },
        nodes: []
      }
    ],
  },
});

// ...

<Editor value={} />
```

## Custom Rendering

If you don't like the default rendering in `renderPlaceholders`, you can just render it yourself by creating your own `renderDecoration` function:

```jsx
function renderDecoration(props, editor, next) {
  const { decoration, children } = props;
  if (decoration.type !== "placeholder") {
    return next();
  }

  const text = decoration.data.get("placeholderText");

  return (
    <span> 
      <span style={{color: "red"}}>
        {text}
      </span>
      {/* NOTE: This children part is important to show the cursor */}
      {children} 
    </span>
  );
}
```
