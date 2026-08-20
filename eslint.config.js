//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  {
    // convex/ and emails/ sit outside the app's tsconfig on purpose: Convex
    // typechecks its functions with its own config, and the email templates are
    // rendered by Resend rather than bundled. Point the type-aware rules at the
    // right project per folder instead of skipping the folders altogether.
    files: ['convex/**/*.ts'],
    languageOptions: { parserOptions: { project: ['./convex/tsconfig.json'] } },
  },
  {
    files: ['emails/**/*.tsx'],
    languageOptions: {
      parserOptions: { project: ['./tsconfig.emails.json'] },
    },
  },
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
      // Convex generates these and excludes them from its own tsconfig, so
      // there is no project that can parse them.
      'convex/_generated/**',
    ],
  },
]
