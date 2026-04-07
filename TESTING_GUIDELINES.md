# Testing Guidelines

## Playwright Selector Rules

- Do not use ID selectors (for example `#upload-input`) in Playwright tests.
- Do not use `data-testid` or any test-only selectors in Playwright tests.
- Prefer accessibility-first selectors in this order:
  1. `getByRole()` with accessible name
  2. `getByLabel()`
  3. `getByText()`
- If a stable selector is hard to use, improve the UI semantics (labels, roles, names) instead of adding test IDs.

## Goal

Tests should match real user interactions and remain resilient through UI refactors.
