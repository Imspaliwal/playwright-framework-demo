import { test, expect, request } from "@playwright/test";
import { config } from "dotenv";

config({ path: "./env/.env" });

test("Open Weather APP useage of API Key exmaple @apieky @401 @Unauthorized", async () => {
    const apiRequestContext = await request.newContext();
    const latitude = "13.0187264";
    const longitude = "77.6634368";
    const URL = "https://api.openweathermap.org/data/3.0/onecall/overview?lat=" + latitude + "&lon=" + longitude + "&appid=" + process.env.OPENWEATHER_APIKEY;
    console.log(URL);

    const apiResponse = await apiRequestContext.get(URL);
    console.log(apiResponse.status());
    console.log(await apiResponse.json());
});
