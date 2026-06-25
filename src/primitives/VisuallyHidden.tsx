import * as React from "react";

/** Visually hides content while keeping it available to screen readers. */
export const VisuallyHidden = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function VisuallyHidden(props, ref) {
  return (
    <span
      ref={ref}
      {...props}
      style={{
        position: "absolute", width: 1, height: 1, padding: 0, margin: -1,
        overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0,
        ...props.style,
      }}
    />
  );
});
