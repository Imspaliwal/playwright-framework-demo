// import fs from "fs";
// import * as cheerio from "cheerio";
// import { config } from "dotenv";
// import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
// import { parse } from "json2csv";

// // config(); // Load .env
// config({ path: "./env/.env" }); // explicitly load from env folder

// const client = new OpenAIClient(process.env.AZURE_OPENAI_ENDPOINT, new AzureKeyCredential(process.env.AZURE_OPENAI_API_KEY));

// function loadHtml(filePath) {
//     const html = fs.readFileSync(filePath, "utf-8");
//     return cheerio.load(html);
// }

// function extractTextElements($, tag, attributes) {
//     const elements = $(tag).filter(function () {
//         return Object.entries(attributes).every(([key]) => $(this).attr(key) !== undefined);
//     });
//     return elements
//         .map((_, el) => $(el).text().trim())
//         .get()
//         .filter(Boolean);
// }

// function generateJsonPrompt(inputList) {
//     return `Convert the following list into a JSON object with each record based on this schema:

// {
//   "name": "Bill Kim Ramen Bar",
//   "rating": "3.2",
//   "reviews": "45",
//   "price": "$$",
//   "category": "Ramen",
//   "location": "916 W Fulton Market",
//   "hours": "Open . Closes 9PM",
//   "services": ["Dine-in", "Takeout", "Delivery"],
//   "actions": ["Order online"]
// }

// You will reply only with the JSON itself, and no other descriptive or explanatory text.
// ---
// Input:
// ${JSON.stringify(inputList, null, 2)}
// `;
// }

// async function getCopilotResponse(prompt) {
//     const response = await client.getChatCompletions(
//         process.env.AZURE_OPENAI_DEPLOYMENT,
//         [
//             {
//                 role: "user",
//                 content: prompt
//             }
//         ],
//         {
//             maxTokens: 4000,
//             temperature: 0.1
//         }
//     );

//     return response.choices[0].message.content.trim().replace(/^json\n/, "");
// }

// async function main() {
//     const $ = loadHtml("map.html");
//     const results = extractTextElements($, "div", { jsaction: true });

//     const recordset = [];
//     const batchSize = 35;

//     for (let i = 0; i < Math.min(results.length, 100); i += batchSize) {
//         const inputList = results.slice(i, i + batchSize);
//         const prompt = generateJsonPrompt(inputList);

//         console.log("Running batch...");
//         const responseContent = await getCopilotResponse(prompt);
//         const data = JSON.parse(responseContent);
//         recordset.push(...data);
//     }

//     fs.writeFileSync("restaurants.json", JSON.stringify(recordset, null, 2), "utf-8");
//     console.log(`✅ Saved ${recordset.length} records to restaurants.json`);
// }

// main().catch(console.error);

// function convertJsonToCsv(jsonPath, csvPath) {
//     const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

//     const csv = parse(jsonData); // Automatically infers fields
//     fs.writeFileSync(csvPath, csv, "utf-8");

//     console.log(`✅ CSV saved to ${csvPath}`);
// }

// convertJsonToCsv("restaurants.json", "restaurants.csv");
