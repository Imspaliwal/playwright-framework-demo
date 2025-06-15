// tests/scrape.spec.js
import { test, expect } from "@playwright/test";
import fs from "fs";
import { FileUtils } from "../../src/utils/fileUtils";

test("Scrape restaurants from Google Maps", async ({ page }) => {
    await page.goto("https://www.google.com/maps");

    // Search for restaurants in Ramamurthy Nagar, Bengaluru
    const searchBox = page.locator("//input[@name='q']");
    const searchQuery = "hospital, Ramamurthy Nagar, Bengaluru";
    await searchBox.fill(searchQuery);
    await page.keyboard.press("Enter");

    // Wait for the results to load
    const searchResults = page.locator("div[role='feed']");

    // Scroll until all results are loaded
    let previousHeight = 0;
    while (true) {
        const currentHeight = await searchResults.evaluate((el) => el.scrollHeight);
        if (currentHeight === previousHeight) break;
        previousHeight = currentHeight;
        await searchResults.evaluate((el) => el.scrollBy(0, el.scrollHeight));
        await page.waitForTimeout(2500);
    }

    // Extract and save the HTML
    const restaurantHTML = await searchResults.evaluate((el) => el.innerHTML);
    FileUtils.writeToFile("map_result.html", `<html><body>${restaurantHTML}</body></html>`);

    // Read the html file and covert data to text and save in CSV // Utilize the Copilot API's
});
