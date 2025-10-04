import { test } from "../../_fixtures/fixturesGeneric";
import { ForgotLoginPage } from "../../../src/ui/pages/auth/ForgotLoginPage";
import { signUpUser } from "../../../src/ui/actions/auth/signUpUser";

let forgotLoginPage;

test.use({ contextsNumber: 2 });

test.beforeEach(async ({ pages, user }) => {
  await signUpUser(pages[0], user);

  forgotLoginPage = new ForgotLoginPage(pages[1]);
});

test(`Successful 'Customer Lookup' flow test`, async ({ user }) => {
  await forgotLoginPage.open();
  await forgotLoginPage.fillFirstNameField(user.firstName);
  await forgotLoginPage.fillLastNameField(user.lastName);
  await forgotLoginPage.fillAddressField(user.address);
  await forgotLoginPage.fillCityField(user.city);
  await forgotLoginPage.fillStateField(user.state);
  await forgotLoginPage.fillZipCodeField(user.zipCode);
  await forgotLoginPage.fillSsnField(user.ssn);
  await forgotLoginPage.clickFindMyLoginInfoButton();

  await forgotLoginPage.assertLoggedInMessageIsVisible();
  await forgotLoginPage.assertLoginDataIsCorrect(user.username, user.password);
});