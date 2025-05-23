export class AdminPage {
    constructor(page) {
        this.page = page;

        this.addBtn = this.page.getByRole("button", { name: "Add" });
        this.saveBtn = this.page.getByRole("button", { name: "Save" });

        this.username = this.page.locator("//label[text()='Username']/../following-sibling::div/input");
        this.password = this.page.locator("//label[text()='Password']/../following-sibling::div/input");
        this.confirmPassword = this.page.locator("//label[text()='Confirm Password']/../following-sibling::div/input");
    }

    async selectUserRole(userRoleType) {
        await this.page.locator(".oxd-select-text").first().click();
        await this.page.getByRole("option", { name: userRoleType }).click();
    }

    async enterEmployeeName(employeeName) {
        const words = employeeName.trim().split(" ");
        const partialName = words.slice(0, -1).join(" ");

        await this.page.getByPlaceholder("Type for hints...").pressSequentially(employeeName, { delay: 500 }); // Delete the last word (simulate backspaces)

        const lastWord = words[words.length - 1];
        for (let i = 0; i < lastWord.length; i++) {
            await this.page.keyboard.press("Backspace");
        }

        await this.page.getByText(employeeName).first().click();
    }

    async selectStatus(statusType) {
        await this.page.getByText("-- Select --").first().click();
        await this.page.getByRole("option", { name: statusType }).click();
    }

    async addUser(employeeData, userRole, status) {
        await this.addBtn.click();
        await this.selectUserRole(userRole);
        await this.enterEmployeeName(employeeData.firstName + " " + employeeData.middleName + " " + employeeData.lastName);
        await this.selectStatus(status);

        await this.username.fill(employeeData.firstName + employeeData.middleName);
        // await this.page.pause();
        await this.password.fill(employeeData.firstName + employeeData.middleName + "123");
        await this.confirmPassword.fill(employeeData.firstName + employeeData.middleName + "123");

        await this.saveBtn.click();
    }
}
