module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 2,
    'no-console': 'off',
    'no-var': 'error',
    'prefer-const': 'warn',
    'no-inferrable-types': 0,
    'no-undef': 'warn',
    // 'no-inferrable-types': false,
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    indent: ['error', 2],
  },
};
