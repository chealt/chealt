const agreeToConsent = async () => {
  // WHEN
  await page.goto('https://www.google.com');

  // THEN
  const consentFrame = page.frames().find((frame) => frame.url().includes('consent.google.com'));

  if (consentFrame) {
    await expect(consentFrame).toClick('span', { text: 'I agree' });
  } else {
    await expect(page).toClick('button', { text: 'I agree' });
  }
};

const clearCookies = async () => {
  const cookies = await page.cookies();

  return page.deleteCookie(...cookies);
};

export { agreeToConsent, clearCookies };
