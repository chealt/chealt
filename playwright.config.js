const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './packages/chealt.com/public',
  testMatch: /.*\.ui-spec\.js/u,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], [process.env.CI ? 'github' : 'list']],
  use: {
    trace: 'on-first-retry',
    video: 'on'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] }
    }
  ]
});
