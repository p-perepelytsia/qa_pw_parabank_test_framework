import { expect, testStep } from "../../../common/helpers/pwHelpers";

export class TransferFundsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.amountField = page.locator('#amount');
    this.transferButton = page.getByRole('button', { name: 'Transfer' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Transfer Funds' page`, async () => {
      await this.page.goto('/parabank/transfer.htm');
    });
  }

  async fillAmountField(amount) {
    await this.step(`Fill the 'Amount' field`, async () => {
      await this.amountField.fill(amount);
    });
  }

  async getAccountIdByIndex(index = 0, selectorType) {
    return await this.step(`Get deposit account ID from option #${index}`, async () => {
      const option = this.page.locator(`#${selectorType} option`).nth(index);
      return await option.getAttribute('value');
    });
  }

  async selectAccount(index = 0, selectorType) {
    const accountId = await this.getAccountIdByIndex(index, selectorType);
    await this.step(`Select account with index #${index} in '${selectorType}' selector`, async () => {
      await this.page.locator(`#${selectorType}`).selectOption(accountId);
    });
  }

  async clickTransferButton() {
    await this.step(`Click on the 'Transfer' button`, async () => {
      await this.transferButton.click();
    });
  }

  async assertErrorMessageIsVisible(message) {
    await this.step(`Assert the '${message}' message is visible`, async () => {
      const errorMessage = this.page.getByText(`${message}`);
      await expect(errorMessage).toBeVisible();
    });
  }

  async assertTransferSuccess(amount) {
    await this.step(`Assert funds transferred successfully`, async () => {
      await expect(this.page.getByRole('heading', { name: 'Transfer Complete!' })).toBeVisible();
      await expect(this.page.getByText(`${amount} has been transferred`, { exact: false })).toBeVisible();
    });
  }
}