import { test } from "../../_fixtures/fixtures";
import { faker } from "@faker-js/faker";
import { signUpUser } from "../../../src/ui/actions/auth/signUpUser";
import { INTERNAL_ERROR } from "../../../src/ui/constants/errorMessages";

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

const testParameters = [
  {
    loanAmount: '',
    downPayment: faker.number.int({ min: 100, max: 500 }).toString(),
    message: INTERNAL_ERROR,
    title: `empty 'Loan Amount' field`,
  },
  {
    loanAmount: faker.number.int({ min: 1000, max: 10000 }).toString(),
    downPayment: '',
    message: INTERNAL_ERROR,
    title: `empty 'Down Payment' field`,
  },
  {
    loanAmount: '',
    downPayment: '',
    message: INTERNAL_ERROR,
    title: `both emtpy 'Loan Amount' and 'Down Payment' fields`,
  },
  {
    loanAmount: faker.word.words(),
    downPayment: faker.word.words(),
    message: INTERNAL_ERROR,
    title: `both invalid 'Loan Amount' and 'Down Payment' fields`,
  },
]

testParameters.forEach(({ 
  loanAmount,
  downPayment,
  message,
  title 
}) => {
  test.describe(`'Request Loan' negative tests`, () => {
    test(`Request a loan with ${title}`, async ({ requestLoanPage }) => {
      await requestLoanPage.open();
      await requestLoanPage.fillLoanAmountField(loanAmount);
      await requestLoanPage.fillDownPaymentField(downPayment);
      await requestLoanPage.clickApplyButton();
      await requestLoanPage.assertErrorMessageIsVisible(message);
    });
  });
});