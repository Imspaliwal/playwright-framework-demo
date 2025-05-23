import { test, request, expect } from "@playwright/test";

test("Auth Token", async () => {
    const requestContext = await request.newContext();

    // If Authorization in Place
    const credentials = `admin:admin`;
    const credentialsBase64 = Buffer.from(credentials).toString("base64");
    console.log("Base64 : ", credentialsBase64);

    const response = await requestContext.get("https://the-internet.herokuapp.com/digest_auth", {
        headers: {
            Authorization: `Basic ${credentialsBase64}`,
            Accept: "*/*",
            // ContentType: 'multipart/form-data',
            ContentType: "text/xml"
        }
    });

    console.log("Response", response);
    expect(response.ok).toBeTruthy();

    await requestContext.dispose();
});
