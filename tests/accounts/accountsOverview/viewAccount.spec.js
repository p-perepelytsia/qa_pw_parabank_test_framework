import { test } from "../../_fixtures/fixtures";
import { signUpUser } from "../../../src/ui/actions/auth/signUpUser";
import { openNewAccount } from "../../../src/ui/actions/accounts/openNewAccount";

let createdAccount;

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
  createdAccount = await openNewAccount(page, 'CHECKING', 0);
});

test(`View newly created account on the 'Account Overview' page`, async ({ accountsOverviewPage }) => {
  await accountsOverviewPage.open();
  await accountsOverviewPage.assertAccountIsVisible(createdAccount.accountNumber);
});

test(`View 'Account Details' for newly created account`, async ({ accountsOverviewPage }) => {
  await accountsOverviewPage.open();
  await accountsOverviewPage.clickOnAccount(createdAccount.accountNumber);
  await accountsOverviewPage.assertAccountDetailsVisible(createdAccount.accountNumber, 'CHECKING');
});
