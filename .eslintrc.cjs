module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'block-spacing': 'warn',
    'comma-dangle': ['warn', 'never'],
    'comma-spacing': 'warn',
    'indent': ['warn', 2, { SwitchCase: 1 }],
    'jsx-quotes': ['warn', 'prefer-double'],
    'key-spacing': 'warn',
    'keyword-spacing': 'warn',
    'no-multiple-empty-lines': ['warn', { max: 1 }],
    'no-trailing-spaces': 'warn',
    'object-curly-newline': ['warn', { consistent: true }],
    'operator-assignment': ['warn', 'always'],
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-unused-vars': 1,
    'no-whitespace-before-property': 'warn',
    'padded-blocks': ['warn', { blocks: 'never' }],
    'semi': ['warn', 'never'],
    'space-before-blocks': 'warn',
    'space-before-function-paren': [
      'error',
      { anonymous: 'never', named: 'never', asyncArrow: 'always' }
    ],
    'space-infix-ops': 'warn',
    'vue/html-self-closing': 0,
    'vue/multi-word-component-names': 'off',
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: '*', next: ['block-like', 'class', 'export'] },
      { blankLine: 'any', prev: 'export', next: 'export' }
    ]
  }
}
