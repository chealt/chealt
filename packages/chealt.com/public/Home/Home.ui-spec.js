import { test, expect } from '@chealt/playwright-utils';

const url = 'http://localhost:8080';

test.describe('Home', () => {
  test('loads the Home Page', async ({ page, screen }) => {
    await page.goto(`${url}`);

    await expect(
      screen.queryByRole('heading', {
        level: 1,
        name: 'Chealt.com'
      })
    ).toBeVisible();
  });
});
