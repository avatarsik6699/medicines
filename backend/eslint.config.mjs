// @ts-check
import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
  {
    ignores: ["eslint.config.mjs", "node_modules", "dist"],

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: "module",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-namespace": "off",

      "prettier/prettier": [
        "warn",
        {
          endOfLine: "auto",
          printWidth: 100,
          tabWidth: 2,
          useTabs: true,
          semi: true,
          singleQuote: false,
          quoteProps: "consistent",
          trailingComma: "es5",
          bracketSpacing: true,
          arrowParens: "avoid",
        },
      ],
    },
  }
);
