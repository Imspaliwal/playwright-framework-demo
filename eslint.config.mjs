import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
// import tseslint from "typescript-eslint"; // commented as this is only js project

export default [
    // { files: ["**/*.{js,mjs,cjs,ts}"] },
    { files: ["**/*.{js,mjs,cjs}"] }, // changed as this is only js project
    { ignores: ["node_modules/", "test-results/", "playwright-report", "summary.json", ".vscode/*"] },
    { languageOptions: { globals: globals.node } },
    // tseslint.configs.recommended, // Check More https://typescript-eslint.io/getting-started/
    // tseslint.configs.strict, // commented as this is only js project
    // tseslint.configs.stylistic, // commented as this is only js project
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
