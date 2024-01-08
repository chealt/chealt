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

  test('can add and edit Family History items', async ({ page, screen }) => {
    await page.goto(`${url}/family-history`);

    await expect(
      screen.queryByRole('heading', {
        level: 1,
        name: 'family history'
      })
    ).toBeVisible();

    await expect(screen.getByText('Your family history will be shown here.')).toBeVisible();

    // Add
    await screen.getByRole('button', { name: /start adding/iu }).click();

    await expect(screen.queryByText(/add family history/iu)).toBeVisible();
    await screen.queryByLabelText(/first name/iu).fill('my first name');
    await screen.queryByLabelText(/last name/iu).fill('my last name');
    await screen.queryByLabelText(/date of birth/iu).fill('1980-01-02');

    await screen.queryByLabelText(/conditions/iu).fill('condition 1');
    await screen.getByRole('button', { name: 'add' }).click();
    await screen.queryByLabelText(/conditions/iu).fill('condition 2');
    await screen.getByRole('button', { name: 'add' }).click();

    await screen.getByRole('button', { name: 'save' }).click();

    // Save success
    await expect(screen.queryByText('Saved family history.')).toBeVisible();
    await expect(screen.getByText('my first name my last name')).toBeVisible();
    await expect(screen.getByText('1/2/1980')).toBeVisible();
    await expect(screen.getByText('condition 1')).toBeVisible();
    await expect(screen.getByText('condition 2')).toBeVisible();

    // Edit
    await screen.getByRole('button', { name: /edit/iu }).click();

    await expect(screen.queryByText(/edit family history/iu)).toBeVisible();
    await expect(screen.queryByLabelText(/first name/iu)).toHaveValue('my first name');
    await expect(screen.getByLabelText(/last name/iu)).toHaveValue('my last name');
    await expect(screen.getByLabelText(/date of birth/iu)).toHaveValue('1980-01-02');
    await expect(
      screen.getByRole('group', { name: /edit family history/iu }).getByText('condition 1')
    ).toBeVisible();
    await expect(
      screen.getByRole('group', { name: /edit family history/iu }).getByText('condition 2')
    ).toBeVisible();
    await page.keyboard.press('Escape');

    // Delete success
    await screen.queryByLabelText('select').click();
    await screen.getByRole('button', { name: 'delete' }).click();
    await expect(screen.queryByText('Family history item(s) deleted.')).toBeVisible();
    await expect(screen.getByText('Your family history will be shown here.')).toBeVisible();
  });
});
