export class LoginPage {
    constructor(page) {
        this.page = page;

        this.username = this.page.getByPlaceholder("Username");
        this.password = this.page.getByPlaceholder("Password");
        this.loginBtn = this.page.getByRole("button").getByText(" Login ");
    }

    async goToLoginPage() {
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        await this.page.waitForURL("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    }

    async doLogin(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }
}
