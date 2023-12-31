import { AxeBuilder } from '@axe-core/playwright';
import { test, expect } from '@chealt/playwright-utils';

import { url } from '../../config.js';

test.describe('Family History', () => {
  test('loads the Family History Page', async ({ page, screen }) => {
    await page.goto(`${url}/family-history`);

    await expect(
      screen.queryByRole('heading', {
        level: 1,
        name: 'family history'
      })
    ).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // eslint-disable-line new-cap

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
