const agreeToConsent = async () => {
  // WHEN
  await page.goto('https://google.com');

  // THEN
  const consentFrame = page.frames().find((frame) => frame.url().includes('consent.google.com'));

  if (consentFrame) {
    await expect(consentFrame).toClick('span', { text: 'I agree' });
  }
};

export { agreeToConsent };
