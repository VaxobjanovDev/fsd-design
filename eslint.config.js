module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'boundaries',
    'import',
    'react'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'standard-with-typescript',
    'standard-react',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    // ✅ Import order
    'import/order': [
      'error',
      {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        'alphabetize': { order: 'asc', caseInsensitive: true },
        'pathGroups': [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after'
          }
        ],
        'pathGroupsExcludedImportTypes': ['builtin']
      }
    ],

    // ✅ Boundaries rules
    'boundaries/element-types': [2, {
      default: 'disallow',
      rules: [
        {
          from: 'features/*',
          allow: ['shared/**', 'entities/**'],
        },
        {
          from: 'entities/*',
          allow: ['shared/**'],
        },
        {
          from: 'widgets/*',
          allow: ['features/**', 'entities/**', 'shared/**'],
        },
        {
          from: 'pages/*',
          allow: ['widgets/**', 'features/**', 'entities/**', 'shared/**'],
        },
        {
          from: 'app/*',
          allow: ['pages/**', 'widgets/**', 'features/**', 'entities/**', 'shared/**'],
        },
        {
          from: 'shared/*',
          allow: ['shared/**'],
        },
      ],
    }],

    // ✅ Code style
    'key-spacing': 'off',
    'react/jsx-no-bind': 'off',
    'jsx-quotes': [2, 'prefer-double'],
    'max-len': [2, 120],
    'object-curly-spacing': [2, 'always'],
    'indent': [2, 2, { SwitchCase: 1 }],
    'comma-dangle': 'off',
    'no-use-before-define': 'off',
    'no-console': 'warn',
    'react/jsx-boolean-value': 'off',

    // ✅ TS specific
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-ts-comment': 'off'
  },

  settings: {
    react: {
      version: 'detect'
    },
    'boundaries/elements': [
      { type: 'features', pattern: 'src/features/*' },
      { type: 'entities', pattern: 'src/entities/*' },
      { type: 'widgets',  pattern: 'src/widgets/*' },
      { type: 'pages',    pattern: 'src/pages/*' },
      { type: 'shared',   pattern: 'src/shared/*' },
      { type: 'app',      pattern: 'src/app/*' },
    ],
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json'
      }
    }
  }
};
