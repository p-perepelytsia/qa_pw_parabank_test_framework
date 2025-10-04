import { test } from "../../_fixtures/fixtures";
import { faker } from "@faker-js/faker";
import { signUpUser } from "../../../src/ui/actions/auth/signUpUser";
import { openNewAccount } from "../../../src/ui/actions/accounts/openNewAccount";
import { INTERNAL_ERROR } from "../../../src/ui/constants/errorMessages";

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
  await openNewAccount(page, 'CHECKING', 0);
});

const testParameters = [
  {
    amount: faker.word.words(),
    accountIndex1: 0,
    selectorType1: 'fromAccountId',
    accountIndex2: 1,
    selectorType2: 'toAccountId',
    message: 'with an invalid amount (text instead of number)',
  },
  {
    amount: '',
    accountIndex1: 0,
    selectorType1: 'fromAccountId',
    accountIndex2: 1,
    selectorType2: 'toAccountId',
    message: `with an empty 'Amount' field`,
  },
];

test.describe(`'Transfer Funds' negative tests`, () => {
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
      await transferFundsPage.assertErrorMessageIsVisible(INTERNAL_ERROR);
    });
  });
});