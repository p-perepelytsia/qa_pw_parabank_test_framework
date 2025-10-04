import { test } from "../../_fixtures/fixtures";
import { faker } from "@faker-js/faker";
import { signUpUser } from "../../../src/ui/actions/auth/signUpUser";
import { openNewAccount } from "../../../src/ui/actions/accounts/openNewAccount";
import { amountFormatStr } from "../../../src/common/helpers/amountFormatHelpers";

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
  await openNewAccount(page, 'CHECKING', 0);
});

const testParameters = [
  {
    amount: faker.number.int({ min: 10, max: 100 }).toString(),
    accountIndex1: 0,
    selectorType1: 'fromAccountId',
    accountIndex2: 1,
    selectorType2: 'toAccountId',
    message: `with a positive value in the 'Amount' field`,
  },
  {
    amount: faker.number.int({ min: -100, max: -10 }).toString(),
    accountIndex1: 0,
    selectorType1: 'fromAccountId',
    accountIndex2: 1,
    selectorType2: 'toAccountId',
    message: `with a negative value in the 'Amount' field`,
  },
];

test.describe(`'Transfer Funds' positive tests`, () => {
  testParameters.forEach(({ 
    amount,
    accountIndex1,
    selectorType1,
    accountIndex2,
    selectorType2,
    message
  }) => {
    test(`Transfer funds ${message}`, async ({ transferFundsPage }) => {
      await transferFundsPage.open();
      await transferFundsPage.fillAmountField(amount);
      await transferFundsPage.selectAccount(accountIndex1, selectorType1);
      await transferFundsPage.selectAccount(accountIndex2, selectorType2);
      await transferFundsPage.clickTransferButton();
      await transferFundsPage.assertTransferSuccess(amountFormatStr(amount))
    });
  });
});