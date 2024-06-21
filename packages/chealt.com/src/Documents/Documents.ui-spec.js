import { AxeBuilder } from '@axe-core/playwright';
import { test, expect } from '@chealt/playwright-utils';

import { url } from '../../config.js';

test.describe('Documents', () => {
  test('loads the Documents Page', async ({ page, screen }) => {
    await page.goto(`${url}/documents`);

    await expect(
      screen.queryByRole('heading', {
        level: 1,
        name: /Documents/iu
      })
    ).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // eslint-disable-line new-cap

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
