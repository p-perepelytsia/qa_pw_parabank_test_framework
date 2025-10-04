import { expect, testStep } from "../../../common/helpers/pwHelpers";

export class RequestLoanPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.loanAmountField = page.locator('#amount');
    this.downPaymentField = page.locator('#downPayment');
    this.applyButton = page.getByRole('button', { name: 'Apply Now' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Request Loan' page`, async () => {
      await this.page.goto('/parabank/requestloan.htm');
    });
  }

  async fillLoanAmountField(loanAmount) {
    await this.step(`Fill the 'Loan Amount' field`, async () => {
      await this.loanAmountField.fill(loanAmount);
    });
  }

  async fillDownPaymentField(downPayment) {
    await this.step(`Fill the 'Down Payment' field`, async () => {
      await this.downPaymentField.fill(downPayment);
    });
  }

  async clickApplyButton() {
    await this.step(`Click the 'Apply Now' button`, async () => {
      await this.applyButton.click();
    });
  }

async clickOnCreatedAccountLink() {
  return await this.step(`Click on the created account link`, async () => {
    const createdAccountLink = this.page.getByRole('link', { name: /^\d+$/ });
    const accountNumberRaw = await createdAccountLink.textContent();
    const accountNumber = accountNumberRaw?.trim();

    await createdAccountLink.click();

    return accountNumber;
  });
}

  async assertAccountDetailsVisible(
    accountNumber, 
    accountType, 
    accountBalance,
  ) {
    await this.step(
      `Assert 'Account Details' for account '${accountNumber}' are visible`,
      async () => {
        const accountIdCell = this.page.locator('#accountId');
        await expect(accountIdCell).toHaveText(accountNumber.toString());

        const accountTypeCell = this.page.locator('#accountType');
        await expect(accountTypeCell).toHaveText(accountType);

        const accountBalanceCell = this.page.locator('#balance');
        await expect(accountBalanceCell).toHaveText(accountBalance);

        const accountAvailableBalanceCell = this.page.locator('#availableBalance');
        await expect(accountAvailableBalanceCell).toHaveText(accountBalance);
      }
    );
  }

  async assertErrorMessageIsVisible(message) {
    await this.step(`Assert the internal error message is visible`, async () => {
      const errorMessage = this.page.getByText(`${message}`);
      await expect(errorMessage).toHaveText(message);
    });
  }

  async assertLoanRequestProcessed() {
    await this.step(`Assert account information updated successfully`, async () => {
      await expect(this.page.getByRole('heading', { name: 'Loan Request Processed' })).toBeVisible({ timeout: 15000 });
      await expect(this.page.locator('text=Congratulations, your loan has been approved.')).toBeVisible();
    });
  }
}

