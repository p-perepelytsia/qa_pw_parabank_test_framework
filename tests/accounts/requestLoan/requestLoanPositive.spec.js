import { test } from "../../_fixtures/fixtures";
import { faker } from "@faker-js/faker";
import { amountFormatStr } from "../../../src/common/helpers/amountFormatHelpers";
import { signUpUser } from "../../../src/ui/actions/auth/signUpUser";

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

const testParameters = [
  {
    loanAmount: faker.number.int({ min: 1000, max: 10000 }).toString(),
    downPayment: faker.number.int({ min: 100, max: 500 }).toString(),
  }
]

testParameters.forEach(({ 
  loanAmount,
  downPayment,
}) => {
  test(`Successful 'Request Loan' flow test`, async ({ requestLoanPage }) => {
    await requestLoanPage.open();
    await requestLoanPage.fillLoanAmountField(loanAmount);
    await requestLoanPage.fillDownPaymentField(downPayment);
    await requestLoanPage.clickApplyButton();
    await requestLoanPage.assertLoanRequestProcessed();
    const accountNumber = await requestLoanPage.clickOnCreatedAccountLink()
    await requestLoanPage.assertAccountDetailsVisible(
      accountNumber, 
      'LOAN', 
      amountFormatStr(loanAmount)
    );
  });
});