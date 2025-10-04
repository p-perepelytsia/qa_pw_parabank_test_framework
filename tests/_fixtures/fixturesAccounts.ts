import { test as base } from '@playwright/test';
import { OpenNewAccountPage } from '../../src/ui/pages/accounts/OpenNewAccountPage';
import { AccountsOverviewPage } from '../../src/ui/pages/accounts/AccountsOverviewPage';
import { BillPayPage } from '../../src/ui/pages/accounts/BillPayPage';
import { FindTransactionsPage } from '../../src/ui/pages/accounts/FindTransactionsPage';
import { TransferFundsPage } from '../../src/ui/pages/accounts/TransferFundsPage';
import { RequestLoanPage } from '../../src/ui/pages/accounts/RequestLoanPage';
import { UpdateContactInfoPage } from '../../src/ui/pages/accounts/UpdateContactInfoPage';

export const test = base.extend<{
  openNewAccountPage; 
  accountsOverviewPage;
  transferFundsPage;
  billPayPage;
  findTransactionsPage;
  updateContactInfoPage;
  requestLoanPage;
}>({
  openNewAccountPage: async ({ page }, use) => {
    const openNewAccountPage = new OpenNewAccountPage(page);

    await use(openNewAccountPage);
  },
  accountsOverviewPage: async ({ page }, use) => {
    const accountsOverviewPage = new AccountsOverviewPage(page);

    await use(accountsOverviewPage);
  },
  billPayPage: async ({ page }, use) => {
    const billPayPage = new BillPayPage(page);

    await use(billPayPage);
  },
    findTransactionsPage: async ({ page }, use) => {
    const findTransactionsPage = new FindTransactionsPage(page);

    await use(findTransactionsPage);
  },
  transferFundsPage: async ({ page }, use) => {
    const transferFundsPage = new TransferFundsPage(page);

    await use(transferFundsPage);
  },
  updateContactInfoPage: async ({ page }, use) => {
    const updateContactInfoPage = new UpdateContactInfoPage(page);

    await use(updateContactInfoPage);
  },
  requestLoanPage: async ({ page }, use) => {
    const requestLoanPage = new RequestLoanPage(page);

    await use(requestLoanPage);
  },
});

