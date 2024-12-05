import parser from "@typescript-eslint/parser";
import eslintPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: parser,
    },
    plugins: {
      "@typescript-eslint": eslintPlugin,
    },
    rules: {
      ...eslintPlugin.configs.recommended.rules,
    },
  },
];
