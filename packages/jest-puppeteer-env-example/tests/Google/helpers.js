const agreeToConsent = async () => {
  // WHEN
  await page.goto('https://www.google.com');

  // THEN
  await expect(page).toClick('button', { text: 'I agree' });
};

const clearCookies = async () => {
  const cookies = await page.cookies();

  return page.deleteCookie(...cookies);
};

export { agreeToConsent, clearCookies };
