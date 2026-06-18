// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';
import { Script } from 'node:vm';

const config = ({
    testDir: './tests',
    timeout: 50 * 1000,
    retries:2,
    expect: {
        timeout: 50 * 1000,
    },
    
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    projects: [
        {
            name: 'chrome',
            use: {
                browserName: 'chromium',
                headless: false,
                screenshot: 'on', //only-on-failure
                trace: 'on', //retain-on-failure
                video: 'on-first-retry',
                ...devices['iPhone 12 Pro Max']
            }
        },
        {
            name: 'safari',
            use: {
                browserName: 'webkit',
                headless: true,
                screenshot: 'on',
                trace: 'on', //retain-on-failure
                viewport:{width:720,height:720},
                video:'retain-on-failure'
            }
        }
    ]


});

module.exports = config;