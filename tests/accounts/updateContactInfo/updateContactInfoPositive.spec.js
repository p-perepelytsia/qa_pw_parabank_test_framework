import { test } from "../../_fixtures/fixtures";
import { signUpUser } from "../../../src/ui/actions/auth/signUpUser";
import { generateNewUserData } from "../../../src/common/testData/generateNewUserData";

const userNewData = generateNewUserData();

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test(`Successful 'Update Contact Info' flow test`, async ({ updateContactInfoPage, user }) => {
  await updateContactInfoPage.open();
  await updateContactInfoPage.assertOldDataIsVisible(user);
  await updateContactInfoPage.fillFirstNameField(userNewData.firstName);
  await updateContactInfoPage.fillLastNameField(userNewData.lastName);
  await updateContactInfoPage.fillAddressField(userNewData.address);
  await updateContactInfoPage.fillCityField(userNewData.city);
  await updateContactInfoPage.fillStateField(userNewData.state);
  await updateContactInfoPage.fillZipCodeField(userNewData.zipCode);
  await updateContactInfoPage.fillPhoneField(userNewData.phone);
  await updateContactInfoPage.clickUpdateProfileButton();
  await updateContactInfoPage.assertUpdatingInformationSuccess();
});