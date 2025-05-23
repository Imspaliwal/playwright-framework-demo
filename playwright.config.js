const { defineConfig, devices } = require("@playwright/test");
import * as dotenv from "dotenv";

dotenv.config({
    // path: `./env/.env.${process.env.ENV}`
    path: `./env/.env.qa`
});

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
    testDir: "./tests",

    // timeout for each test
    timeout: 3 * 60 * 1000,

    // timeout for each assertion
    expect: {
        timeout: 2 * 60 * 1000
    },

    reporter: "html",
    // fullyParallel: false,
    fullyParallel: process.env.TEST_PARALLEL === "true",

    // shared setting for all tests
    use: {
        browserName: "chromium",
        headless: false,
        reporter: "list",
        screenshot: "on",
        trace: "on",
        viewport: null,
        launchOptions: {
            args: ["--start-maximized"]
        }
    }
});
