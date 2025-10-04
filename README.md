# Task Description

To see the description of the task assignment [follow the link](https://github.com/mate-academy/qa_pw_parabank_test_framework/blob/main/TaskDescription.md). 

# Repository Overview

This repository contains a test automation framework for the [Parabank](https://parabank.parasoft.com/parabank/index.htm) bank application testing. 

# How to use this project

## Installation steps

To install the project follow the next steps:

1. Install Node.js.
2. Run the installation command in the project root.:
```bash
npm ci
```
3. Run the browsers installation in the project root.
```bash
npx playwright install
```
4. Install Allure commandline tool (Allure requires Java 8 or higher).
```bash
npm install -g allure-commandline
```

## How to run the tests

To execute the test suite, use the following command in the project root directory:

```bash
npx playwright test
```

You can run specific tests or folders by providing a path, for example:

```bash
npx playwright test tests/login.spec.ts
```

To run tests with a specific browser, use:

```bash
npx playwright test --project=chromium
```

## How to generate report

After running the tests, you can generate an Allure report with:

```bash
npx allure generate allure-results --clean -o allure-report
```

To open the generated report in your browser, run:

```bash
npx allure open allure-report
```

Make sure you have installed the Allure commandline tool as described in the installation steps.
