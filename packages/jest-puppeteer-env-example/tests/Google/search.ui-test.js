import { agreeToConsent } from './helpers';

describe('Google', () => {
  it('should be able to search', async () => {
    // GIVEN
    await agreeToConsent();

    // WHEN
    await page.goto('https://www.google.com');
    await expect(page).toFill('input[name=q]', 'Puppeteer');
    await page.keyboard.press('Enter');
    await page.waitForNavigation();

    // THEN
    await expect(page).toMatchElement('h1', { text: 'Search Results' });
  });
});
