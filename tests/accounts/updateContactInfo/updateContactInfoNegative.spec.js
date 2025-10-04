import { test } from "../../_fixtures/fixtures";
import { signUpUser } from "../../../src/ui/actions/auth/signUpUser";
import { generateNewUserData } from "../../../src/common/testData/generateNewUserData";
import { 
  FIRST_NAME_REQUIRED, 
  LAST_NAME_REQUIRED, 
  ADDRESS_REQUIRED,
  CITY_REQUIRED,
  STATE_REQUIRED,
  ZIP_CODE_REQUIRED
 } from "../../../src/ui/constants/errorMessages";

const userNewData = generateNewUserData();
const testParameters = [
  {
    firstName: '',
    lastName: userNewData.lastName,
    address: userNewData.address,
    city: userNewData.city,
    state: userNewData.state,
    zipCode: userNewData.zipCode,
    phone: userNewData.phone,
    message: FIRST_NAME_REQUIRED,
    title: `empty 'First Name' field`,
  },
  {
    firstName: userNewData.firstName,
    lastName: '',
    address: userNewData.address,
    city: userNewData.city,
    state: userNewData.state,
    zipCode: userNewData.zipCode,
    phone: userNewData.phone,
    message: LAST_NAME_REQUIRED,
    title: `empty 'Last Name' field`,
  },
  {
    firstName: userNewData.firstName,
    lastName: userNewData.lastName,
    address: '',
    city: userNewData.city,
    state: userNewData.state,
    zipCode: userNewData.zipCode,
    phone: userNewData.phone,
    message: ADDRESS_REQUIRED,
    title: `empty 'Address' field`,
  },
  {
    firstName: userNewData.firstName,
    lastName: userNewData.lastName,
    address: userNewData.address,
    city: '',
    state: userNewData.state,
    zipCode: userNewData.zipCode,
    phone: userNewData.phone,
    message: CITY_REQUIRED,
    title: `empty 'City' field`,
  },
  {
    firstName: userNewData.firstName,
    lastName: userNewData.lastName,
    address: userNewData.address,
    city: userNewData.city,
    state: '',
    zipCode: userNewData.zipCode,
    phone: userNewData.phone,
    message: STATE_REQUIRED,
    title: `empty 'State' field`,
  },
  {
    firstName: userNewData.firstName,
    lastName: userNewData.lastName,
    address: userNewData.address,
    city: userNewData.city,
    state: userNewData.state,
    zipCode: '',
    phone: userNewData.phone,
    message: ZIP_CODE_REQUIRED,
    title: `empty 'Zip Code' field`,
  }
]

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

testParameters.forEach(({ 
  firstName, 
  lastName, 
  address, 
  city, 
  state, 
  zipCode,
  phone,  
  message,
  title 
}) => {
  test.describe(`'Update Contact Info' negative tests`, () => {
    test(`Update information with ${title}`, async ({ updateContactInfoPage, user }) => {
      await updateContactInfoPage.open();
      await updateContactInfoPage.assertOldDataIsVisible(user);
      await updateContactInfoPage.fillFirstNameField(firstName);
      await updateContactInfoPage.fillLastNameField(lastName);
      await updateContactInfoPage.fillAddressField(address);
      await updateContactInfoPage.fillCityField(city);
      await updateContactInfoPage.fillStateField(state);
      await updateContactInfoPage.fillZipCodeField(zipCode);
      await updateContactInfoPage.fillPhoneField(phone);
      await updateContactInfoPage.clickUpdateProfileButton();
      await updateContactInfoPage.assertErrorMessageIsVisible(message);
    });
  });
});
