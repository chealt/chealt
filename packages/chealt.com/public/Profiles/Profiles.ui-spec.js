import { test, expect } from '@chealt/playwright-utils';

import { url } from '../../config.js';

test.describe('Profiles', () => {
  test('loads the Profiles Page', async ({ page, screen }) => {
    await page.goto(`${url}/profiles`);

    await expect(
      screen.queryByRole('heading', {
        level: 1,
        name: 'Profiles'
      })
    ).toBeVisible();
  });
});
