import { AxeBuilder } from '@axe-core/playwright';
import { test, expect } from '@chealt/playwright-utils';

import { url } from '../../config.js';

test.describe('Home', () => {
  test('loads the Home Page', async ({ page, screen }) => {
    await page.goto(`${url}`);

    await expect(
      screen.queryByRole('heading', {
        level: 1,
        name: 'Chealt'
      })
    ).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // eslint-disable-line new-cap

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
