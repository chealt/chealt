import { agreeToConsent, clearCookies } from './helpers';

describe.skip('Google', () => {
  beforeEach(clearCookies);

  it('should show the Google logo', async () => {
    // GIVEN
    await agreeToConsent();

    // WHEN
    await page.goto('https://www.google.com');

    // THEN
    await expect(page).toMatchElement('[aria-label="Google Search"]');
  });

  it('should have an input field for searching', async () => {
    // GIVEN
    await agreeToConsent();

    // WHEN
    await page.goto('https://www.google.com');

    // THEN
    await expect(page).toFill('input[name=q]', 'search term');
  });
});
