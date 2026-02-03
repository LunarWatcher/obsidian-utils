import tseslint from 'typescript-eslint';
import obsidianmd from "eslint-plugin-obsidianmd";
import globals from "globals";
import { globalIgnores } from "eslint/config";

export default tseslint.config(
    {
        plugins: {
            obsidianmd
        },
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                projectService: {
                    allowDefaultProject: [
                        'eslint.config.js',
                        'manifest.json',
                    ]
                },
                tsconfigRootDir: import.meta.dirname,
                extraFileExtensions: ['.json']
            },
        },
    },
    ...obsidianmd.configs.recommended,
    {
        rules: {
            /**
             * Per LunarWatcher/obsidian-webdav-sync, sentence-case configuration is broken, so it can fuck right off
             * before it causes problems here too.
             */
            "obsidianmd/ui/sentence-case": [
                "off"
            ],
        }
    },
    globalIgnores([
        "node_modules",
        "dist",
        "esbuild.config.mjs",
        "eslint.config.mts",
        "version-bump.mjs",
        "versions.json",
        "main.js",
        "env",
        "integration-test",
        "tests",
        "jest.config.js",
    ]),
);
