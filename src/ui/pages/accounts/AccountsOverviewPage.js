import { expect, testStep } from "../../../common/helpers/pwHelpers";

export class AccountsOverviewPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.goButton = page.getByRole('button', { name: 'Go' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Accounts Overview' page`, async () => {
      await this.page.goto('/parabank/overview.htm');
    });
  }

  async assertAccountIsVisible(accountNumber) {
    await this.step(
      `Assert that account with number '${accountNumber}' is visible on the 'Accounts Overview' page`,
      async () => {
        const row = this.page.locator(`#accountTable tbody tr:has(a:text-is("${accountNumber}"))`);
        await expect(row).toBeVisible();
      });
  }

async clickOnAccount(accountNumber) {
  await this.step(`Open account '${accountNumber}'`, async () => {
    const accountLink = this.page.getByRole('link', { name: accountNumber });
    await accountLink.click();

    await this.page.waitForTimeout(5000);
  });
}

  async selectActivityPeriod(activityPeriod) {
    await this.step(`Select activity period - ${activityPeriod}`, async () => {
      await this.page.locator('#month').selectOption(activityPeriod);
    });
  }

  async selectTransactionType(transactionType) {
    await this.step(`Select transaction type - ${transactionType}`, async () => {
      await this.page.locator('#transactionType').selectOption(transactionType);
    });
  }
  
  async clickGoButton() {
    await this.step(`Click the 'Go' button`, async () => {
      await this.goButton.click();
    });
  }

  async assertAccountDetailsVisible(accountNumber, accountType) {
    await this.step(
      `Assert 'Account Details' for account '${accountNumber}' are visible`,
      async () => {
        const accountIdCell = this.page.locator('#accountId');
        await expect(accountIdCell).toHaveText(accountNumber.toString());

        const accountTypeCell = this.page.locator('#accountType');
        await expect(accountTypeCell).toHaveText(accountType);

        await expect(this.page.locator('#balance')).toBeVisible();
        await expect(this.page.locator('#availableBalance')).toBeVisible();
      }
    );
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

  async assertNoTransactions() {
    await this.step(`Assert no transactions are visible`, async () => {
      await expect(this.page.getByText('No transactions found.')).toBeVisible();
    });
  }

  async getTransactionId(accountNumber) {
    return await this.step(
      `Get transaction ID for 'Funds Transfer Received' from account '${accountNumber}'`,
      async () => {
        await this.open();
        await this.clickOnAccount(accountNumber);

        let transactionId;

        await this.step(`Click on 'Funds Transfer Received' transaction`, async () => {
          const transactionLink = this.page.getByRole('link', { name: 'Funds Transfer Received' });
          await transactionLink.click();
        });

        await this.step(`Get Transaction ID from table`, async () => {
          const transactionIdCell = this.page.locator(
            'table >> xpath=.//tr[td[b[text()="Transaction ID:"]]]/td[2]'
          );
          transactionId = await transactionIdCell.innerText();
        });

        return transactionId;
      }
    );
  }
}
