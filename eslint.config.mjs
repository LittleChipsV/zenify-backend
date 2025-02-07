import globals from 'globals';
import pluginJs from '@eslint/js';
import jestPlugin from 'eslint-plugin-jest';

// Rules Global
const globalRules = {
  'no-console': 'warn',
  'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  'no-undef': 'error',
  'no-extra-semi': 'error',
  'no-multiple-empty-lines': ['error', { max: 1 }],
  quotes: ['warn', 'single', { avoidEscape: true }],
  semi: ['error', 'always'],
};

// Rules untuk Jest
const jestRules = {
  ...jestPlugin.configs.recommended.rules,
  'jest/no-disabled-tests': 'warn',
  'jest/no-focused-tests': 'error',
  'jest/no-identical-title': 'error',
  'jest/prefer-to-have-length': 'warn',
  'jest/valid-expect': 'error',
};

export default [
  pluginJs.configs.recommended,
  
  // Config global
  {
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      ...globalRules,
    },
  },

  // Config untuk JavaScript
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },

  // Config untuk Jest (untuk testing)
  {
    files: ['**/*.test.js'],
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      ...jestRules,
    },
  },
];
