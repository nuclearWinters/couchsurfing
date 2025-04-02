import * as stylex from "@stylexjs/stylex";

const spin = stylex.keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

export const loadingStyles = stylex.create({
  dualRing: {
    color: "#1c4c5b",
    boxSizing: "border-box",
    "::after": {
      boxSizing: "border-box",
      content: " ",
      display: "block",
      width: "64px",
      height: "64px",
      margin: "8px",
      borderRadius: "50%",
      border: "6.4px solid currentColor",
      borderColor: "currentColor transparent currentColor transparent",
      animationName: spin,
      animationDuration: "1.2s",
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
    },
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
});

export const Spinner = () => {
  return (
    <div {...stylex.props(loadingStyles.container)}>
      <div {...stylex.props(loadingStyles.dualRing)} />
    </div>
  );
};
