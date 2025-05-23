### Playwright Framework Demo With JavaScript

An example project demonstrating automation of playwright tests using page object design pattern framework and api testing.

#### Application Under Test

We are using https://opensource-demo.orangehrmlive.com/ for UI Tests and "https://the-internet.herokuapp.com/digest_auth" for API Tests as the Application Under Test.

#### Scenarios UI Testing

```bash
Scenario 1: Login to Orange HRM

Scenario 2: Add Employee on PIM page

Scenario 3: Search Employee Information By Employment Status

Scenario 4: Create a Admin User on Admin Page

```

#### Scenarios API Testing

```bash
Scenario 1: Authenticate the user using digest token

Scenario 2: Donwload the File

Scenario 3: Upload the File

```

#### Installation

Install the dependencies and devDependencies to run the test.

-   Clone reporepository on to your local machine
-   Navigate to project's directory on terminal and run the following commands:

Clone the repository

```bash
git clone https://github.com/Imspaliwal/playwright-framework-demo.git
```

Install dependencies

```bash
npm install
npx playwright install
```

#### Run application

To run test in headless or parallel enable & disable, edit in .env file for the respective property

Run tests

```bash
npx playwright test
```

Run specific tests

```bash
npx playwright test filename.spec.js
```
