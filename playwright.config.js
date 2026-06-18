// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { workers } from 'node:cluster';
import { trace } from 'node:console';

const config= ({
  testDir: './tests',
  
  timeout: 50 * 1000,
  retries:1,
  //workers: 5,
  expect: {
    timeout: 50 * 1000,
  },
  reporter: [
    ['line'],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    trace: 'on', //retain-on-failure
    video:'retain-on-failure'
  },
  
  
});

module.exports= config;