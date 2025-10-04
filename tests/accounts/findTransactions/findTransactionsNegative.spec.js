import { test } from "../../_fixtures/fixtures";
import { faker } from "@faker-js/faker";
import { signUpUser } from "../../../src/ui/actions/auth/signUpUser";
import { openNewAccount } from "../../../src/ui/actions/accounts/openNewAccount";
import { 
  INVALID_ID,
  INVALID_DATE,
  INVALID_AMOUNT
 } from "../../../src/ui/constants/errorMessages";

let createdAccount;

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
  createdAccount = await openNewAccount(page, 'CHECKING', 0);
});

const testParameters = [
  {
    fieldType: 'id',
    value1: '',
    buttonType: 0,
    message: INVALID_ID,
    title: `with an empty 'Find by Transaction ID' field`,
  },
  {
    fieldType: 'id',
    value1: faker.word.words(),
    buttonType: 0,
    message: INVALID_ID,
    title: `with an invalid 'Find by Transaction ID' field`,
  },
  {
    fieldType: 'date',
    value1: '',
    buttonType: 1,
    message: INVALID_DATE,
    title: `with an empty 'Find by Date' field`,
  },
  {
    fieldType: 'date',
    value1: faker.word.words(),
    buttonType: 1,
    message: INVALID_DATE,
    title: `with an invalid 'Find by Date' field`,
  },
  {
    fieldType: 'fromToDate',
    value1: '',
    value2: '',
    buttonType: 2,
    message: INVALID_DATE,
    title: `with an empty 'Find by Date Range' fields`,
  },
  {
    fieldType: 'fromToDate',
    value1: faker.word.words(),
    value2: faker.word.words(),
    buttonType: 2,
    message: INVALID_DATE,
    title: `with an invalid 'Find by Date Range' fields`,
  },
  {
    fieldType: 'amount',
    value1: '',
    buttonType: 3,
    message: INVALID_AMOUNT,
    title: `with an empty 'Amount' field`,
  },
  {
    fieldType: 'amount',
    value1: faker.word.words(),
    buttonType: 3,
    message: INVALID_AMOUNT,
    title: `with an invalid 'Amount' field`,
  },
];

test.describe(`'Find Transactions' negative tests`, () => {
  testParameters.forEach(({
    fieldType,
    value1,
    value2, 
    buttonType,
    message,
    title
  }) => {
    test(`Find transaction ${title}`, async ({ findTransactionsPage }) => {
      await findTransactionsPage.open();
      await findTransactionsPage.selectAccount(createdAccount.accountNumber);
      await findTransactionsPage.fillTransactionField(fieldType, value1, value2);
      await findTransactionsPage.clickFindTransactionsButton(buttonType);
      await findTransactionsPage.assertErrorMessageIsVisible(message);
    });
  });
});