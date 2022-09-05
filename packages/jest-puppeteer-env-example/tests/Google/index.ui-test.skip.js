import { agreeToConsent, clearCookies } from './helpers';

describe.skip('Google', () => {
  beforeEach(async () => {
    await clearCookies();

    if (!process.env.CI) {
      await agreeToConsent();
    }
  });

  it('should show the Google logo', async () => {
    // WHEN
    await page.goto('https://www.google.com');

    // THEN
    await expect(page).toMatchElement('[aria-label="Google Search"]');
  });

  it('should have an input field for searching', async () => {
    // WHEN
    await page.goto('https://www.google.com');

    // THEN
    await expect(page).toFill('input[name=q]', 'search term');
  });
});
