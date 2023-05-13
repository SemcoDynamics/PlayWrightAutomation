// @ts-check
const { devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  
  testDir: './tests',
  // Maximum time one test can run for. */
  timeout: 60 * 1000,
  expect: {

    timeout: 5000

  },

  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

      browserName : 'chromium',
      headless : false,
      screenshot : 'on',
      trace : 'retain-on-failure',
      viewport: null,
     //   width: 1536,
     //   height: 842,
     // },
      launchOptions: {
        args: ["--start-maximized"]
      },

    }
};

module.exports = config;