import { expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

export class PIMPage {
    constructor(page) {
        this.page = page;

        this.addBtn = this.page.getByRole("button", { name: "Add" });
        this.addEmpHeading = this.page.getByRole("heading", { name: "Add Employee" });
        this.firstName = this.page.getByPlaceholder("First Name");
        this.middleName = this.page.getByPlaceholder("Middle Name");
        this.lastName = this.page.getByPlaceholder("Last Name");
        // this.empId = this.page.locator("//label[text()='Employee Id']/../following-sibling::div");
        this.empId = this.page.locator("form").getByRole("textbox").nth(4);
        this.saveBtn = this.page.getByRole("button", { name: "Save" });
    }

    async moveToPage(pageName) {
        await this.page.getByRole("link", { name: pageName }).click();
    }

    async selectEmploymentStatus(empStatusType) {
        await this.page.getByText("-- Select --").first().click();
        // await this.page.getByText(empStatusType).click();
        await this.page.getByRole("option", { name: empStatusType }).locator("span").click();
        await this.page.getByRole("button", { name: "Search" }).click();
    }

    async addEmployee(employeeData) {
        await this.addBtn.click();
        expect(await this.addEmpHeading).toBeVisible();

        await this.firstName.fill(employeeData.firstName);
        await this.middleName.fill(employeeData.middleName);
        await this.lastName.fill(employeeData.lastName);
        await this.empId.clear();
        await this.empId.fill(employeeData.empId, { force: true });

        await this.saveBtn.click();
    }

    async readTable() {
        // Get all headers
        let headers = await this.page.getByRole("columnheader").allTextContents();
        headers = headers.map((header) => header.replace(/AscendingDescending/g, "").trim());
        console.log("Headers:", headers); // Get all rows

        const rows = await this.page.getByRole("row").all();
        const rowData = [];

        for (const row of rows) {
            const cells = await row.getByRole("cell").allTextContents();
            console.log("Row:", cells);

            if (cells.length > 0) {
                rowData.push(cells);
            }
        } // Create JSON structure

        const tableData = {
            headers,
            rows: rowData
        }; // Save to JSON file
        // Ensure testdata directory exists
        return tableData;
    }

    async writeToFile(fileName, dataToWrite) {
        const dir = path.join(process.cwd(), "testdata");
        path.join();
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        } // Write to file

        const filePath = path.join(dir, fileName);
        fs.writeFileSync(filePath, JSON.stringify(dataToWrite, null, 2));
        console.log(`Data saved to ${filePath}`);
    }
}
