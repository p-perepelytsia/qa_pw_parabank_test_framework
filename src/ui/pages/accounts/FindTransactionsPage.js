import { expect, testStep } from "../../../common/helpers/pwHelpers";

export class FindTransactionsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Find Transactions' page`, async () => {
      await this.page.goto('/parabank/findtrans.htm');
    });
  }

  async selectAccount(accountNumber) {
    await this.step(`Select account with number - ${accountNumber}`, async () => {
      await this.page.locator('#accountId').selectOption(accountNumber);
    })
  }

  async fillTransactionField(fieldType, value1, value2 = null) {
    const fields = {
      id: this.page.locator('#transactionId'),
      date: this.page.locator('#transactionDate'),
      fromDate: this.page.locator('#fromDate'),
      toDate: this.page.locator('#toDate'),
      amount: this.page.locator('#amount')
    };

    await this.step(`Fill the '${fieldType}' field(s)`, async () => {
      if (fieldType === 'fromToDate') {
        await fields.fromDate.fill(value1);
        await fields.toDate.fill(value2);
      } else {
        await fields[fieldType].fill(value1);
      }
    });
  }

  async clickFindTransactionsButton(index) {
    const ids = [
      '#findById',
      '#findByDate',
      '#findByDateRange',
      '#findByAmount'
    ];

    const button = this.page.locator(ids[index]);

    await this.step(`Click the 'Find Transactions' button #${index} (${ids[index]})`, async () => {
      await button.click();
    });
  }

  async assertErrorMessageIsVisible(message) {
    await this.step(`Assert the '${message}' message is visible`, async () => {
      const errorMessage = this.page.getByText(`${message}`);
      await expect(errorMessage).toBeVisible();
    });
  }

  async assertTransactionIsVisible({ description }) {
    await this.step(
      `Assert transaction with description '${description}' is visible`,
      async () => {
        const row = this.page.locator(
          `#transactionTable tbody tr:has(td a:text-is("${description}"))`
        );
        await expect(row).toBeVisible();
      }
    );
  }
}