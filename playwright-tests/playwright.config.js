const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

const baseURL = process.env.BASE_URL || 'https://jsonplaceholder.typicode.com';

module.exports = defineConfig({
  testDir: './tests',
  retries: 2,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'playwright-report/report.json' }],
  ],
  use: {
    baseURL,
    trace: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    }
  ],
});

