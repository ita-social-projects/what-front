module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb/hooks',
    'prettier',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  plugins: ['babel', 'react', 'react-hooks', 'prettier'],
  rules: {
    required: {
      some: ['nesting', 'id'],
    },
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'linebreak-style': 0,
    'eol-last': 0,
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'react/button-has-type': 'off',
    'object-curly-spacing': [2, 'always'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-one-expression-per-line': 0,
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'object-curly-newline': 'off',
  },
};
