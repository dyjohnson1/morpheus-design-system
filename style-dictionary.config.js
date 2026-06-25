// Style Dictionary v4 config — builds /tokens/*.json → CSS custom properties + TS export.
export default {
  source: ["tokens/**/*.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "build/",
      files: [{
        destination: "morph-tokens.css",
        format: "css/variables",
        options: { outputReferences: true, selector: ":root" }
      }]
    },
    ts: {
      transformGroup: "js",
      buildPath: "build/",
      files: [{ destination: "morph-tokens.ts", format: "javascript/es6" }]
    }
  }
};
