import js from '@eslint/js';
import globals from 'globals';

export default [
    js.configs.recommended,
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off',
            eqeqeq: 'error',
            curly: 'error',
            'prefer-const': 'warn',
        },
    },
    {
        ignores: ['node_modules/**'],
    },
];
