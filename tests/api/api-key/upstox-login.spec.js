// @ts-nocheck
import { test, expect, request } from "@playwright/test";
import { config } from "dotenv";
import { URL } from "url";
import { FileUtils } from "../../../src/utils/fileUtils";
import * as fs from "fs";

config({ path: "./env/.env" });

test("API Key authentication @apieky @upstox", async ({ page }) => {
    // Perform Authentication
    const client_id = process.env.UPSTOX_CLIENT_ID;
    const redirect_uri = "https://www.google.com";
    const response_type = "code";
    // URL construction
    const LOGIN_URL = "https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=" + client_id + "&redirect_uri=" + redirect_uri;

    await page.goto(LOGIN_URL);

    await page.fill("#mobileNum", "8050253023");
    await page.getByRole("button", { name: "Get OTP" }).click({ timeout: 5000, noWaitAfter: true });
    console.log("Please complete the login manually in the browser...");

    // Wait for the redirect to happen (you can adjust this based on how long login usually takes)
    const redirectedRequest = await page.waitForRequest(
        (request) => {
            const url = request.url();
            return url.startsWith(redirect_uri) && url.includes("code=");
        },
        { timeout: 300000 }
    );

    // Get the code from redirect URL
    const redirectedUrl = await redirectedRequest.url();
    console.log("Redirected URL", redirectedUrl);

    const urlObj = new URL(redirectedUrl);
    const code_from_login = await urlObj.searchParams.get("code");
    // console.log(await urlObj.searchParams.entries().next());

    console.log("Authorization Code:", code_from_login);

    // Close Browser
    await page.close();

    // Generate Access Token
    const apiRequest = await request.newContext();

    const apiResponse = await apiRequest.post("https://api.upstox.com/v2/login/authorization/token", {
        params: {
            code: code_from_login,
            client_id: process.env.UPSTOX_CLIENT_ID,
            client_secret: process.env.UPSTOX_CLIENT_SECRET,
            redirect_uri: "https://www.google.com",
            grant_type: "authorization_code"
        },
        headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    expect(await apiResponse.status()).toBe(200);

    const profile_json = await apiResponse.json();
    console.log("Access Token", profile_json);

    FileUtils.writeToFile("profile_json.json", profile_json);
});

// let access_token;
// test.skip("Use access_toke in other scenario", async () => {
//     const file = await fs.readFileSync(process.cwd() + "/testdata/profile_json.json");
//     console.log("user_id:", await JSON.parse(file).user_id);

//     access_token = await JSON.parse(file).access_token;
//     console.log("access_token:", await JSON.parse(file).access_token);
// });

test.skip("ohlc @ohlc", async () => {
    const file = await fs.readFileSync(process.cwd() + "/testdata/profile_json.json");
    // console.log("user_id:", await JSON.parse(file).user_id);

    const access_token = await JSON.parse(file).access_token;
    // console.log("access_token:", await JSON.parse(file).access_token);

    const apiRequest = await request.newContext();

    const apiResponse = await apiRequest.get("https://api.upstox.com/v2/market-quote/ohlc", {
        // Query Parameter
        params: {
            instrument_key: "NSE_EQ|164693",
            interval: "1d"
        },
        headers: {
            Authorization: "Bearer " + access_token,
            Accept: "application/json"
        }
    });

    expect(await apiResponse.status()).toBe(200);
    console.log(JSON.stringify(await apiResponse.status()));
    console.log(JSON.stringify(await apiResponse.json()));
});

test.only("historic data @historic", async () => {
    const file = await fs.readFileSync(process.cwd() + "/testdata/profile_json.json");

    const access_token = await JSON.parse(file).access_token;

    const pathParam = {
        instrument_key: "NSE_EQ|INE839G01010",
        interval: "week",
        from_date: "2025-01-01", // YYYY-MM-DD
        to_date: "2025-05-23"
    };

    const ENDPOINT_URL = `https://api.upstox.com/v2/historical-candle/${pathParam.instrument_key}/${pathParam.interval}/${pathParam.to_date}/${pathParam.from_date}`;
    console.log("Endpoint: ", ENDPOINT_URL);

    const apiRequest = await request.newContext();

    const apiResponse = await apiRequest.get(ENDPOINT_URL, {
        headers: {
            // Authorization: "Bearer " + access_token,
            Accept: "application/json"
        }
    });

    console.log(JSON.stringify(await apiResponse.status()));
    console.log(JSON.stringify(await apiResponse.json()));
    expect(await apiResponse.status()).toBe(200);
});
