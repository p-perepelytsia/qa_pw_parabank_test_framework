import { test } from '../../_fixtures/fixtures';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';
import { 
  FIRST_NAME_REQUIRED, 
  LAST_NAME_REQUIRED, 
  ADDRESS_REQUIRED,
  CITY_REQUIRED,
  STATE_REQUIRED,
  ZIP_CODE_REQUIRED,
  SSN_REQUIRED,
  USERNAME_REQUIRED,
  PASSWORD_REQUIRED,
  CONFIRM_PASSWORD_REQUIRED,
  PASSWORDS_DO_NOT_MATCH,
  USERNAME_ALREADY_EXISTS,
 } from '../../../src/ui/constants/errorMessages';
import { SignUpPage } from '../../../src/ui/pages/auth/SignUpPage';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

const user = generateNewUserData();
const testParameters = [
  {
    firstName: '',
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    phone: user.phone,
    ssn: user.ssn,
    username: user.username,
    password: user.password,
    confirmPassword: user.password,
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
    username: user.username,
    password: user.password,
    confirmPassword: user.password,
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
    username: user.username,
    password: user.password,
    confirmPassword: user.password,
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
    username: user.username,
    password: user.password,
    confirmPassword: user.password,
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
    username: user.username,
    password: user.password,
    confirmPassword: user.password,
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
    username: user.username,
    password: user.password,
    confirmPassword: user.password,
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
    username: user.username,
    password: user.password,
    confirmPassword: user.password,
    message: SSN_REQUIRED,
    title: `empty 'SSN' field`,
  },
  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    phone: user.phone,
    ssn: user.ssn,
    username: '',
    password: user.password,
    confirmPassword: user.password,
    message: USERNAME_REQUIRED,
    title: `empty 'Username' field`,
  },
  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    phone: user.phone,
    ssn: user.ssn,
    username: user.username,
    password: '',
    confirmPassword: user.password,
    message: PASSWORD_REQUIRED,
    title: `empty 'Password' field`,
  },
  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    phone: user.phone,
    ssn: user.ssn,
    username: user.username,
    password: user.password,
    confirmPassword: '',
    message: CONFIRM_PASSWORD_REQUIRED,
    title: `empty 'Confirm Password' field`,
  },
  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    phone: user.phone,
    ssn: user.ssn,
    username: user.username,
    password: user.password,
    confirmPassword: 'DifferentPassword123!',
    message: PASSWORDS_DO_NOT_MATCH,
    title: `mismatched 'Password' and 'Confirm Password' fields`,
  },
];

test.describe(`'Sign up' negative tests`, () => {
  testParameters.forEach(({ 
      firstName, 
      lastName, 
      address, 
      city, 
      state, 
      zipCode, 
      phone, 
      ssn, 
      username, 
      password,
      confirmPassword, 
      message, 
      title, 
    }) => {
    test(`Sign up with ${title}`, async ({ signUpPage }) => {
      await signUpPage.open();
      await signUpPage.fillFirstNameField(firstName);
      await signUpPage.fillLastNameField(lastName);
      await signUpPage.fillAddressField(address);
      await signUpPage.fillCityField(city);
      await signUpPage.fillStateField(state);
      await signUpPage.fillZipCodeField(zipCode);
      await signUpPage.fillPhoneField(phone);
      await signUpPage.fillSsnField(ssn);
      await signUpPage.fillUsernameField(username);
      await signUpPage.fillPasswordField(password);
      await signUpPage.fillConfirmPasswordField(confirmPassword);
      await signUpPage.clickRegisterButton();
      await signUpPage.assertErrorMessageIsVisible(message);
      });
    });

    test.use({ contextsNumber: 2 });
    test(`Sign up with existing 'Username' field`, async ({ pages }) => {
      const existingUser = generateNewUserData();

      await signUpUser(pages[0], existingUser, 1);

      const signUpPage = new SignUpPage(pages[1], 2);

      await signUpPage.open();
      await signUpPage.fillFirstNameField(user.firstName);
      await signUpPage.fillLastNameField(user.lastName);
      await signUpPage.fillAddressField(user.address);
      await signUpPage.fillCityField(user.city);
      await signUpPage.fillStateField(user.state);
      await signUpPage.fillZipCodeField(user.zipCode);
      await signUpPage.fillPhoneField(user.phone);
      await signUpPage.fillSsnField(user.ssn);
      await signUpPage.fillUsernameField(existingUser.username);
      await signUpPage.fillPasswordField(user.password);
      await signUpPage.fillConfirmPasswordField(user.password);
      await signUpPage.clickRegisterButton();
      await signUpPage.assertErrorMessageIsVisible(USERNAME_ALREADY_EXISTS);
    });
});