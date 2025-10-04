import { test } from "../../_fixtures/fixtures";
import { signUpUser } from "../../../src/ui/actions/auth/signUpUser";

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

const testParameters = [
  {
    accountType: 'CHECKING',
    accountId: 0,
  },
  {
    accountType: 'SAVINGS',
    accountId: 0,
  },
];

test.describe(`Open new accounts with different types`, () => {
  testParameters.forEach(({ 
    accountType,
    accountId
  }) => {
    test(`Open new account with type - ${accountType}`, async ({ openNewAccountPage }) => {
      await openNewAccountPage.open();
      await openNewAccountPage.selectAccountType(accountType);
      await openNewAccountPage.selectDepositAccount(accountId);
      await openNewAccountPage.clickOpenNewAccountButton();
      await openNewAccountPage.assertAccountOpeningSuccess();
    });
  });
});