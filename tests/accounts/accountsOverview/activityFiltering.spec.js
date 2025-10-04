import { test } from "../../_fixtures/fixtures";
import { getCurrentMonthName } from "../../../src/common/helpers/dateHelpers";
import { signUpUser } from "../../../src/ui/actions/auth/signUpUser";
import { openNewAccount } from "../../../src/ui/actions/accounts/openNewAccount";

let createdAccount;
const currentMonth = getCurrentMonthName();

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
  createdAccount = await openNewAccount(page, "CHECKING", 0);
});

test.describe(`Account activity filtering`, () => {
  test(`Activity is visible for current month`, async ({ accountsOverviewPage }) => {
    await accountsOverviewPage.open();
    await accountsOverviewPage.clickOnAccount(createdAccount.accountNumber);
    await accountsOverviewPage.selectActivityPeriod(currentMonth)
    await accountsOverviewPage.selectTransactionType("Credit");
    await accountsOverviewPage.clickGoButton();
    await accountsOverviewPage.assertTransactionIsVisible({
      description: 'Funds Transfer Received'
    });
  });

  test(`Activity is visible with 'All' period filter`, async ({ accountsOverviewPage }) => {
    await accountsOverviewPage.open();
    await accountsOverviewPage.clickOnAccount(createdAccount.accountNumber);
    await accountsOverviewPage.selectActivityPeriod("All");
    await accountsOverviewPage.selectTransactionType("Credit");
    await accountsOverviewPage.clickGoButton();
    await accountsOverviewPage.assertTransactionIsVisible({
      description: 'Funds Transfer Received'
    });
  });

  test(`No activity is visible for past months`, async ({ accountsOverviewPage }) => {
    await accountsOverviewPage.open();
    await accountsOverviewPage.clickOnAccount(createdAccount.accountNumber);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ].filter(m => m !== currentMonth);

    for (const month of months) {
      await accountsOverviewPage.selectActivityPeriod(month);
      await accountsOverviewPage.selectTransactionType("All");
      await accountsOverviewPage.clickGoButton();
      await accountsOverviewPage.assertNoTransactions();
    }
  });

  test(`No Debit transactions are visible for current month`, async ({ accountsOverviewPage }) => {
    await accountsOverviewPage.open();
    await accountsOverviewPage.clickOnAccount(createdAccount.accountNumber);
    await accountsOverviewPage.selectActivityPeriod(currentMonth);
    await accountsOverviewPage.selectTransactionType("Debit");
    await accountsOverviewPage.clickGoButton();
    await accountsOverviewPage.assertNoTransactions();
  });

  test(`No Debit transactions are visible with 'All' period filter`, async ({ accountsOverviewPage }) => {
    await accountsOverviewPage.open();
    await accountsOverviewPage.clickOnAccount(createdAccount.accountNumber);
    await accountsOverviewPage.selectActivityPeriod("All");
    await accountsOverviewPage.selectTransactionType("Debit");
    await accountsOverviewPage.clickGoButton();
    await accountsOverviewPage.assertNoTransactions();
  });
});
