// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';

const config= ({
  testDir: './tests',
  timeout: 50 * 1000,
  expect: {
    timeout: 50 * 1000,
  },
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'on'
  },
  
  
});

module.exports= config;