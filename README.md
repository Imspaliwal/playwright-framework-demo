### Playwright Framework Demo With JavaScript

An example project demonstrating automation of playwright tests using page object design pattern framework and api testing.

#### Application Under Test

We are using [https://opensource-demo.orangehrmlive.com/](https://blockstream.info/block/000000000000000000076c036ff5119e5a5a74df77abf64203473364509f7732) for UI Tests as the Application Under Test.

#### Scenarios UI Testing

```bash
Scenario 1: Validate the transaction headers

Scenario 2: Validate the total number of transactions having 1 input and 2 output transactions

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
