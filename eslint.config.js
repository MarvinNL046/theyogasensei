//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  {
    rules: {
      'import/no-cycle': 'off',
      'import/order': 'off',
      'sort-imports': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/require-await': 'off',
      'pnpm/json-enforce-catalog': 'off',
    },
  },
  {
    // Everything below is outside tsconfig's project, so the type-aware rules
    // cannot parse it: eslint reported one parsing error per file — 297 of
    // them — which buried the real findings. .output and dist are build
    // artefacts; src/design-references is reference material tsconfig already
    // excludes; convex and emails are compiled by their own toolchains.
    ignores: [
      'eslint.config.js',
      'prettier.config.js',
      '.output/**',
      'dist/**',
      'src/design-references/**',
      'convex/**',
      'emails/**',
    ],
  },
]
