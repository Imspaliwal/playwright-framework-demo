import { test, request, expect } from "@playwright/test";
import * as path from "path";
import * as fs from "fs";
import { FileUtils } from "../../src/utils/fileUtils";

test("File Download", async () => {
    const filePath = path.resolve(process.cwd(), "testdata/emp_data.json");
    // const fileStream = fs.createReadStream(filePath);
    const image = fs.readFileSync(filePath);

    const requestContext = await request.newContext();

    // If Authorization in Place
    // const credentials = `username:password`;
    // const credentialsBase64 = Buffer.from(credentials).toString("base64");
    // console.log("Base64 : ", credentialsBase64);

    const response = await requestContext.get("https://the-internet.herokuapp.com/download/sample_upload.txt", {
        headers: {
            // Authorization: `Basic ${credentialsBase64}`,
            Accept: "*/*",
            // ContentType: 'multipart/form-data',
            ContentType: "text/xml"
        }
    });

    console.log("Response", response);
    expect(response.ok).toBeTruthy();

    const buffer = await response.body();

    FileUtils.writeToFile("downloaded-file.pdf", buffer);

    console.log("File downloaded and saved as downloaded-file.pdf");
    await requestContext.dispose();
});
