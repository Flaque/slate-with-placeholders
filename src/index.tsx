import { Plugin, RenderDecorationProps } from "slate-react";
import { Editor, Point } from "slate";

export function withPlaceholders({ types }: { types: string[] }): Plugin {
  return {
    decorateNode: (node, editor, next) => {
      if (node.object !== "block") return next();
      if (!types.includes(node.type)) return next();

      const texts = [...node.texts({})];
      if (texts.length > 1) {
        return [];
      }
      if (texts.length !== 0 && texts[0][0].get("text") !== "") {
        return [];
      }

      const placeholderText =
        node.data.get("placeholderText") || "Type something";

      const anchor = Point.create({
        path: texts[0][1]
      });

      const focus = Point.create({
        path: texts[0][1],
        offset: 1
      });

      const decoration = node.createDecoration({
        anchor,
        focus,
        type: "placeholder",
        data: {
          placeholderText
        }
      });

      return [decoration];
    }
  };
}

export function renderPlaceholders(): Plugin {
  function renderDecoration(
    props: RenderDecorationProps,
    _: Editor,
    next: () => any
  ) {
    const { decoration, children } = props;
    if (decoration.type !== "placeholder") {
      return next();
    }

    const text = decoration.data.get("placeholderText");

    return (
      <span>
        <span
          contentEditable={false}
          style={{
            pointerEvents: "none",
            display: "inline-block",
            width: "0",
            maxWidth: "100%",
            whiteSpace: "nowrap",
            opacity: 0.333,
            verticalAlign: "text-top",

            // placeholders shouldn't interfere with height
            // of the object
            height: 0
          }}
        >
          {text}
        </span>
        {children}
      </span>
    );
  }

  return {
    renderDecoration
  };
}
