import { agreeToConsent } from './helpers';

describe('Google', () => {
  it('should the Google logo', async () => {
    // GIVEN
    await agreeToConsent();

    // WHEN
    await page.goto('https://google.com');

    // THEN
    await expect(page).toMatchElement('img[alt=Google]');
  });
});
