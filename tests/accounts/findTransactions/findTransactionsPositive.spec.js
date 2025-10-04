import { test } from "../../_fixtures/fixtures";
import { signUpUser } from "../../../src/ui/actions/auth/signUpUser";
import { openNewAccount } from "../../../src/ui/actions/accounts/openNewAccount";
import { INTERNAL_ERROR } from "../../../src/ui/constants/errorMessages";
import { getFormattedDate } from "../../../src/common/helpers/dateHelpers";

let createdAccount;

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
  createdAccount = await openNewAccount(page, 'CHECKING', 0);
});

test.describe(`'Find Transactions' positive tests`, () => {
  test(`Find transaction by Transaction ID`, async ({ accountsOverviewPage, findTransactionsPage }) => {
    const transactionId = await accountsOverviewPage.getTransactionId(
      createdAccount.accountNumber
    );

    await findTransactionsPage.open();
    await findTransactionsPage.selectAccount(createdAccount.accountNumber);
    await findTransactionsPage.fillTransactionField('id', transactionId);
    await findTransactionsPage.clickFindTransactionsButton(0);
    await findTransactionsPage.assertErrorMessageIsVisible(INTERNAL_ERROR);
  });

  test(`Find transaction by Date`, async ({ findTransactionsPage }) => {
    await findTransactionsPage.open();
    await findTransactionsPage.selectAccount(createdAccount.accountNumber);
    await findTransactionsPage.fillTransactionField('date', getFormattedDate(0));
    await findTransactionsPage.clickFindTransactionsButton(1);
    await findTransactionsPage.assertTransactionIsVisible({
      description: 'Funds Transfer Received'
    });
  });

  test(`Find transaction by Dat Range`, async ({ findTransactionsPage }) => {
    await findTransactionsPage.open();
    await findTransactionsPage.selectAccount(createdAccount.accountNumber);
    await findTransactionsPage.fillTransactionField('fromToDate', getFormattedDate(-1), getFormattedDate(1));
    await findTransactionsPage.clickFindTransactionsButton(2);
    await findTransactionsPage.assertTransactionIsVisible({
      description: 'Funds Transfer Received'
    });
  });

  test(`Find transaction by Amount`, async ({ findTransactionsPage }) => {
    await findTransactionsPage.open();
    await findTransactionsPage.selectAccount(createdAccount.accountNumber);
    await findTransactionsPage.fillTransactionField('amount', createdAccount.amount);
    await findTransactionsPage.clickFindTransactionsButton(3);
    await findTransactionsPage.assertTransactionIsVisible({
      description: 'Funds Transfer Received'
    });
  });
});