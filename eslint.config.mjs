import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import jest from "eslint-plugin-jest";
import prettier from "eslint-plugin-prettier";

export default defineConfig([
  { ignores: [".next/**", "node_modules/**", "dist/**", "jest.config.js"] },
  { files: ["**/*.js"], languageOptions: { globals: globals.browser } },
  { files: ["**/*.js"], plugins: { js }, extends: ["js/recommended"] },
  {
    files: ["**/*.js"],
    plugins: { prettier },
    rules: { "prettier/prettier": "warn" },
  },
  {
    files: ["**/*.test.js"],
    languageOptions: { globals: { ...globals.browser, ...globals.jest } },
    plugins: { jest },
    rules: { ...jest.configs.recommended.rules },
  },
]);
