import { expect, testStep } from "../../../common/helpers/pwHelpers";

export class BillPayPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.payeeNameField = page.locator('input[name="payee\\.name"]');
    this.addressField = page.locator('input[name="payee\\.address\\.street"]');
    this.cityField = page.locator('input[name="payee\\.address\\.city"]');
    this.stateField = page.locator('input[name="payee\\.address\\.state"]');
    this.zipCodeField = page.locator('input[name="payee\\.address\\.zipCode"]');
    this.phoneField = page.locator('input[name="payee\\.phoneNumber"]');
    this.accountField = page.locator('input[name="payee\\.accountNumber"]');
    this.verifyAccountField = page.locator('input[name="verifyAccount"]');
    this.amountField = page.locator('input[name="amount"]');
    this.accountSelector = page.locator('select[name="fromAccountId"]');
    this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async safeFill(field, value) {
    await field.fill(value);
    await field.press('Tab'); // triggering change
    await expect(field).toHaveValue(value); // validating real pasting
  }

  async open() {
    await this.step(`Open 'Bill Pay' page`, async () => {
      await this.page.goto('/parabank/billpay.htm');
    });
  }

  async fillPayeeNameField(payeeName) {
    await this.step(`Fill the 'Payee Name' field`, async () => {
      await this.safeFill(this.payeeNameField, payeeName);
    });
  }

  async fillAddressField(address) {
    await this.step(`Fill the 'Address' field`, async () => {
      await this.safeFill(this.addressField, address);
    });
  }

  async fillCityField(city) {
    await this.step(`Fill the 'City' field`, async () => {
      await this.safeFill(this.cityField, city);
    });
  }

  async fillStateField(state) {
    await this.step(`Fill the 'State' field`, async () => {
      await this.safeFill(this.stateField, state);
    });
  }

  async fillZipCodeField(zipCode) {
    await this.step(`Fill the 'Zip Code' field`, async () => {
      await this.safeFill(this.zipCodeField, zipCode);
    });
  }

  async fillPhoneField(phone) {
    await this.step(`Fill the 'Phone' field`, async () => {
      await this.safeFill(this.phoneField, phone);
    });
  }

  async fillAccountField(accountNumber) {
    await this.step(`Fill the 'Account' field`, async () => {
      await this.safeFill(this.accountField, accountNumber);
    });
  }

  async fillVerifyAccountField(verifyNumber) {
    await this.step(`Fill the 'Verify Account' field`, async () => {
      await this.safeFill(this.verifyAccountField, verifyNumber);
    });
  }

  async fillAmountField(amount) {
    await this.step(`Fill the 'Amount' field`, async () => {
      await this.safeFill(this.amountField, amount);
    });
  }

  async getAccountIdByIndex(index = 0) {
    return await this.step(`Get account ID from option #${index} in the 'From Account #' selector`, async () => {
      const option = this.accountSelector.locator('option').nth(index);
      return await option.getAttribute('value');
    });
  }

  async selectAccount(index = 0) {
    const accountId = await this.getAccountIdByIndex(index);
    await this.step(`Select account with index #${index} in the 'From Account #' selector`, async () => {
      await this.accountSelector.selectOption(accountId);
    });
  }

  async clickSendPaymentButton() {
    await this.step(`Click 'Send Payment' button`, async () => {
      await this.sendPaymentButton.click();
    });
  }

  async assertErrorMessageIsVisible(messages) {
    const errors = Array.isArray(messages) ? messages : [messages];

    for (const message of errors) {
      await this.step(`Assert the '${message}' message is visible`, async () => {
        const errorMessages = this.page.getByText(message);
        const count = await errorMessages.count();

        for (let i = 0; i < count; i++) {
          await expect(errorMessages.nth(i)).toBeVisible();
        }
      });
    }
  }

  async assertPaymentSuccess(payeeName, amount) {
    await this.step(`Assert bill payment successfully processed`, async () => {
      await expect(this.page.getByRole('heading', { name: 'Bill Payment Complete' })).toBeVisible();
      await expect(this.page.getByText(`Bill Payment to ${payeeName} in the amount of ${amount}`, { exact: false })).toBeVisible();
    });
  }
}
