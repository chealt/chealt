import { agreeToConsent } from './helpers';

describe.skip('Google', () => {
  it('should fail this test', async () => {
    // GIVEN
    await agreeToConsent();

    // WHEN
    await page.goto('https://www.google.com');

    // THEN
    await expect(page).toMatch('There is no way this message will be included in this website...');
  });
});
