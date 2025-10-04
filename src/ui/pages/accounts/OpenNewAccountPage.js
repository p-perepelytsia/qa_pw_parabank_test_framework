import { expect, testStep } from "../../../common/helpers/pwHelpers";

export class OpenNewAccountPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.OpenNewAccountButton = page.getByRole('button', { name: 'Open New Account' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Open New Account' page`, async () => {
      await this.page.goto('/parabank/openaccount.htm');
    });
  }

  async selectAccountType(accountType) {
    await this.step(`Select account type - ${accountType}`, async () => {
      await this.page.locator('#type').selectOption(accountType);
    })
  }

  async getDepositAccountIdByIndex(index = 0) {
    return await this.step(`Get deposit account ID from option #${index}`, async () => {
      const option = this.page.locator('#fromAccountId option').nth(index);
      return await option.getAttribute('value');
    });
  }

  async selectDepositAccount(index = 0) {
    const accountId = await this.getDepositAccountIdByIndex(index);
    await this.step(`Select deposit account with index #${index}`, async () => {
      await this.page.locator('#fromAccountId').selectOption(accountId);
    });
  }

  async clickOpenNewAccountButton() {
    await this.step(`Click 'Open New Account' button`, async () => {
      await this.OpenNewAccountButton.click();
    });
  }

 async submitNewAccountCreation(accountType, accoundId) {
    await this.step(`Submit new account creation form`, async () => {
      await this.selectAccountType(accountType);
      await this.selectDepositAccount(accoundId);
      await this.clickOpenNewAccountButton();
    });
 }

  async assertAccoutOpeningSuccess() {
    await this.step(`Assert new account opened successfully`, async () => {
      await expect(this.page.getByRole('heading', { name: 'Account Opened!' })).toHaveText('Account Opened!');
      await expect(this.page.locator('text=Congratulations, your account is now open.')).toBeVisible();
    });
  }

  async getCreatedAccountNumber() {
    return await this.step(`Get newly created account number`, async () => {
      const accountLink = this.page.getByRole('link', { name: /\d+/ });
      return await accountLink.innerText();
    });
  }

  async getMinimumDepositAmount() {
    return await this.step(`Get minimum deposit amount`, async () => {
      const text = await this.page.getByText(/A minimum of \$.+ must be/).innerText();
      const match = text.match(/\$(\d+)/);
      return match ? match[1] : "0";
    });
  }
}