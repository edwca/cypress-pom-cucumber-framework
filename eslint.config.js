import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import cypressPlugin from 'eslint-plugin-cypress';
import cucumberPlugin from 'eslint-plugin-cucumber';

import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
        cy: 'readonly',
        Cypress: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        before: 'readonly',
        after: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        JQuery: 'readonly', // <== esto es clave
        setTimeout: 'readonly',
        console: 'readonly',
      },
      parser: tsParser,
      parserOptions: {
        project:'./tsconfig.eslint.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      cypress: cypressPlugin,
      cucumber: cucumberPlugin,
    },
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'cypress/no-unnecessary-waiting': 'warn',
      'cypress/no-assigning-return-values': 'error',
    },
  },
  {
    ignores: [
      'node_modules/',
      'allure-report/',
      'allure-results/',
      '*.enc',
      'cypress.config.ts',
      'cypress-cucumber-preprocessor.config.ts'
    ]
  },
];
