import { test, expect } from "../../src/fixtures/fixtures";
import { EmployeeData } from "../../testdata/EmployeeData";

test("Login to Orange HRM", async ({ page, loginPage }) => {
    console.log("Login to Orange HRM app");
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.HRM_USERNAME, process.env.HRM_PASSWORD);

    await page.close();
});

test("Add Employee on PIM page", async ({ page, loginPage, pimPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.HRM_USERNAME, process.env.HRM_PASSWORD);

    console.log("Navigate to PIM");
    await pimPage.moveToPage("PIM");

    const empployeeData = new EmployeeData();
    console.log(await empployeeData.getEmployeeData());

    console.log("Add Employee with Employee Data \n", empployeeData);
    await pimPage.addEmployee(await empployeeData.getEmployeeData());

    await page.close();
});

test("Search Employee Information By Employment Status", async ({ page, loginPage, pimPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.HRM_USERNAME, process.env.HRM_PASSWORD);

    console.log("Navigate to PIM");
    await pimPage.moveToPage("PIM");

    console.log("Search the Employee by Status");
    await pimPage.selectEmploymentStatus("Full-Time Permanent");

    await expect(page.getByText("Found")).toBeVisible();

    console.log("Traverse through the table");
    const empTableData = await pimPage.readTable();

    console.log("Collect the Search info in a file");
    await pimPage.writeToFile("emp_data.json", empTableData);

    await page.close();
});

test("Create a Admin User on Admin Page", async ({ page, loginPage, pimPage, adminPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.HRM_USERNAME, process.env.HRM_PASSWORD);

    console.log("Navigate to PIM");
    await pimPage.moveToPage("PIM");

    const empployeeData = new EmployeeData();
    const empData = empployeeData.getEmployeeData();
    console.log(empData);

    console.log("Add Employee with Employee Data \n", empData);
    await pimPage.addEmployee(empData);

    console.log("Navigate to Admin");
    await pimPage.moveToPage("Admin");

    console.log("Add the Employee to Admin Role");
    await adminPage.addUser(empData, "Admin", "Enabled");

    await page.close();
});
