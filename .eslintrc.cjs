module.exports = {
  'env': {
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/essential',
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'vue',
  ],
  'rules': {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-unused-vars': 'warn',
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true },
    ],
    'no-empty-pattern': 'off',
    'no-undef': 'off',
    'no-return-assign': 'warn',
    'no-prototype-builtins': 'warn',
    'no-case-declarations': 'off',
    'no-lone-blocks': 'warn',
    'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
    'space-before-function-paren': 'off',
    'comma-dangle': ['warn', 'always-multiline'],
    semi: ['warn', 'always'],
    camelcase: 'off',
    'brace-style': ['warn'],
    'vue/no-unused-vars': 'warn',
    'vue/no-unused-components': 'warn',
    'vue/no-side-effects-in-computed-properties': 'warn',
    "vue/multi-word-component-names": ["error", {
      "ignores": ['index'],
    }],
  },
};
