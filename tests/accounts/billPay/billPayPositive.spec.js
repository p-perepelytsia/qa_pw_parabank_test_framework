import { test } from "../../_fixtures/fixturesGeneric";
import { faker } from "@faker-js/faker";
import { signUpUser } from "../../../src/ui/actions/auth/signUpUser";
import { openNewAccount } from "../../../src/ui/actions/accounts/openNewAccount";
import { amountFormatStr } from "../../../src/common/helpers/amountFormatHelpers";
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';
import { BillPayPage } from "../../../src/ui/pages/accounts/BillPayPage";

let createdAccount;
let currentUser;

test.use({ contextsNumber: 2 });

test.beforeEach(async ({ pages, user }) => {
  currentUser = user;
  await signUpUser(pages[0], user, 1);
  createdAccount = await openNewAccount(pages[0], 'CHECKING', 0, 1);
});

test("Successful 'Bill Pay' flow test", async ({ pages }) => {
  const testParameters = [
    {
      payeeName: `${currentUser.firstName} ${currentUser.lastName}`,
      address: currentUser.address,
      city: currentUser.city,
      state: currentUser.state,
      zipCode: currentUser.zipCode,
      phone: currentUser.phone,
      accountNumber: createdAccount.accountNumber,
      verifyNumber: createdAccount.accountNumber,
      amount: faker.number.int({ min: 100, max: 300 }).toString(),
      selectAccount: 0,
    }
  ];

  for (const param of testParameters) {
    const newUser = generateNewUserData();
    await signUpUser(pages[1], newUser, 2);

    const billPayPage = new BillPayPage(pages[1], 2);

    await billPayPage.open();
    await billPayPage.fillPayeeNameField(param.payeeName);
    await billPayPage.fillAddressField(param.address);
    await billPayPage.fillCityField(param.city);
    await billPayPage.fillStateField(param.state);
    await billPayPage.fillZipCodeField(param.zipCode);
    await billPayPage.fillPhoneField(param.phone);
    await billPayPage.fillAccountField(param.accountNumber);
    await billPayPage.fillVerifyAccountField(param.verifyNumber);
    await billPayPage.fillAmountField(param.amount);
    await billPayPage.selectAccount(param.selectAccount);
    await billPayPage.clickSendPaymentButton();
    await billPayPage.assertPaymentSuccess(
      param.payeeName,
      amountFormatStr(param.amount)
    );
  }
});
