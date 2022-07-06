module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  globals: {
    context: 'readonly',
    given: 'readonly',
  },
  ignorePatterns: [
    'build/',
    'node_modules/',
    '.pnp.cjs',
  ],
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'unused-imports',
    'flowtype',
    'jest',
    'testing-library',
    '@emotion',
  ],
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:jest/recommended',
    'plugin:testing-library/react',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  overrides: [
    {
      extends: [
        'plugin:cypress/recommended',
      ],
      files: [
        'cypress/**/*.ts',
      ],
      rules: {
        'jest/expect-expect': 'off',
        'testing-library/await-async-utils': 'off',
        'jest/valid-expect': 'off',
        'jest/valid-expect-in-promise': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
        '@typescript-eslint/no-empty-interface': [
          'error',
          {
            allowSingleExtends: true,
          },
        ],
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-restricted-exports': 'off',
    'jest/no-identical-title': 'off',
    'import/no-unresolved': 'error',
    'react/react-in-jsx-scope': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'simple-import-sort/imports': ['error', {
      groups: [
        // Node.js builtins. You could also generate this regex if you use a `.js` config.
        // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
        ['^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)'],
        // Packages. `react` related packages come first.
        ['^react'],
        ['^@?\\w'],
        // Internal packages.
        ['^(@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)'],
        // Side effect imports.
        ['^\\u0000'],
        // Parent imports. Put `..` last.
        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
        // Other relative imports. Put same-folder imports and `.` last.
        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        // Style imports.
        ['^.+\\.s?css$'],
      ],
    }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_',
      },
    ],
    'react/jsx-props-no-spreading': ['error', { exceptions: ['input', 'TradingLineChart', 'select', 'InputField'] }],
    'jsx-a11y/anchor-is-valid': ['error', {
      aspects: ['invalidHref'],
    }],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/label-has-for': ['error', {
      required: {
        some: ['nesting', 'id'],
      },
    }],
    'jsx-a11y/label-has-associated-control': ['error', {
      required: {
        some: ['nesting', 'id'],
      },
    }],
    'react/require-default-props': [2, {
      ignoreFunctionalComponents: true,
    }],
    camelcase: ['error', { allow: ['snapshot_UNSTABLE', 'next_page'], properties: 'never' }],
    'no-underscore-dangle': ['error', { allow: ['_r', '_active', '_id'] }],
    'testing-library/no-unnecessary-act': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'function-paren-newline': 'off',
    'react/function-component-definition': [2, { unnamedComponents: 'arrow-function' }],
  },
};
