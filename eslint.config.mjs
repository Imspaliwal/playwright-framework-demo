import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

export default [
    { files: ["**/*.{js,mjs,cjs,ts}"] },
    { ignores: ["node_modules/", "test-results/", "playwright-report", "summary.json", ".vscode/*"] },
    { languageOptions: { globals: globals.node } },
    // tseslint.configs.recommended, // Check More https://typescript-eslint.io/getting-started/
    tseslint.configs.strict,
    tseslint.configs.stylistic,
    pluginJs.configs.recommended,
    eslintPluginPrettier,
    {
        rules: {
            // "capitalized-comments": ["error", "always"],
            "prettier/prettier": [
                "error",
                {
                    endOfLine: "auto",
                },
            ],
            "no-unused-vars": "off",
        },
    },
];
