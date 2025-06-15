// tests/scrape.spec.js
import { test, expect } from "@playwright/test";

test("Scrape restaurants from Google Maps", async ({ page }) => {
    await page.goto("https://www.google.com/maps");

    // Search for restaurants in Ramamurthy Nagar, Bengaluru
});
