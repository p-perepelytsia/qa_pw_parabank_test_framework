import { test } from "../../_fixtures/fixtures";
import { faker } from "@faker-js/faker";
import { generateNewUserData } from "../../../src/common/testData/generateNewUserData";
import { 
  FIRST_NAME_REQUIRED, 
  LAST_NAME_REQUIRED, 
  ADDRESS_REQUIRED,
  CITY_REQUIRED,
  STATE_REQUIRED,
  ZIP_CODE_REQUIRED,
  SSN_REQUIRED,
  CUSTOMER_INFORMATION_NOT_FOUND,
 } from "../../../src/ui/constants/errorMessages";

const user = generateNewUserData();
const testParameters = [
  {
    firstName: '',
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    ssn: user.ssn,
    message: FIRST_NAME_REQUIRED,
    title: `empty 'First Name' field`,
  },
  {
    firstName: user.firstName,
    lastName: '',
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    phone: user.phone,
    ssn: user.ssn,
    message: LAST_NAME_REQUIRED,
    title: `empty 'Last Name' field`,
  },
  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: '',
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    phone: user.phone,
    ssn: user.ssn,
    message: ADDRESS_REQUIRED,
    title: `empty 'Address' field`,
  },
  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    city: '',
    state: user.state,
    zipCode: user.zipCode,
    phone: user.phone,
    ssn: user.ssn,
    message: CITY_REQUIRED,
    title: `empty 'City' field`,
  },
  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: '',
    zipCode: user.zipCode,
    phone: user.phone,
    ssn: user.ssn,
    message: STATE_REQUIRED,
    title: `empty 'State' field`,
  },
  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: '',
    phone: user.phone,
    ssn: user.ssn,
    message: ZIP_CODE_REQUIRED,
    title: `empty 'Zip Code' field`,
  },
  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    phone: user.phone,
    ssn: '',
    message: SSN_REQUIRED,
    title: `empty 'SSN' field`,
  },
  {
    firstName: faker.lorem.slug(3),
    lastName: faker.lorem.slug(3),
    address: faker.lorem.slug(3),
    city: faker.lorem.slug(3),
    state: faker.lorem.slug(3),
    zipCode: faker.lorem.slug(3),
    phone: faker.lorem.slug(3),
    ssn: faker.lorem.slug(3),
    message: CUSTOMER_INFORMATION_NOT_FOUND,
    title: `invalid data in fields`,
  }
]

testParameters.forEach(({ 
  firstName, 
  lastName, 
  address, 
  city, 
  state, 
  zipCode,  
  ssn, 
  message,
  title 
}) => {
  test.describe(`'Customer Lookup' negative tests`, () => {
    test(`Validate your account with ${title}`, async ({ forgotLoginPage }) => {
      await forgotLoginPage.open();
      await forgotLoginPage.fillFirstNameField(firstName);
      await forgotLoginPage.fillLastNameField(lastName);
      await forgotLoginPage.fillAddressField(address);
      await forgotLoginPage.fillCityField(city);
      await forgotLoginPage.fillStateField(state);
      await forgotLoginPage.fillZipCodeField(zipCode);
      await forgotLoginPage.fillSsnField(ssn);
      await forgotLoginPage.clickFindMyLoginInfoButton();
      await forgotLoginPage.assertErrorMessageIsVisible(message);
    });
  });
});

