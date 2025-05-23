import { test, request, expect } from "@playwright/test";
import * as path from "path";
import * as fs from "fs";

test("File Upload", async () => {
    const filePath = path.resolve(process.cwd(), "testdata/emp_data.json");
    // const fileStream = fs.createReadStream(filePath);
    const image = fs.readFileSync(filePath);

    const requestContext = await request.newContext();

    // If Authorization in Place
    // const credentials = `username:password`;
    // const credentialsBase64 = Buffer.from(credentials).toString("base64");
    // console.log("Base64 : ", credentialsBase64);

    const response = await requestContext.post("https://the-internet.herokuapp.com/upload", {
        headers: {
            // Authorization: `Basic ${credentialsBase64}`,
            Accept: "*/*",
            // ContentType: 'multipart/form-data',
            ContentType: "text/xml"
        },
        multipart: {
            file: {
                name: filePath,
                mimeType: "text/plain",
                buffer: image
            }
        }
        // data: image
    });

    console.log("Response", response);
    expect(response.ok).toBeTruthy();

    await requestContext.dispose();
});
