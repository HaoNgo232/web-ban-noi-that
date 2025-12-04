import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // TypeScript: cấm dùng any
      "@typescript-eslint/no-explicit-any": "error",
      // Biến/args không dùng
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      // Hạn chế type assertion: cấm assert với object literal, báo khi assert không cần thiết
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { assertionStyle: "as", objectLiteralTypeAssertions: "never" },
      ],
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      // Ngăn dùng các ts-comment để lách kiểm tra kiểu
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          tsIgnore: true,
          tsExpectError: false,
          tsNocheck: true,
          minimumDescriptionLength: 3,
        },
      ],
    },
  },
]);
