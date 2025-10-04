import { test } from '../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';
import { 
  PAYEE_NAME_REQUIRED,
  ADDRESS_REQUIRED,
  CITY_REQUIRED,
  STATE_REQUIRED,
  ZIP_CODE_REQUIRED,
  PHONE_REQUIRED,
  ACCOUNT_NUMBER_REQUIRED,
  NUMBERS_DO_NOT_MATCH,
  EMPTY_AMOUNT,
 } from '../../../src/ui/constants/errorMessages';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

const user = generateNewUserData();
const amount = faker.number.int({ min: 100, max: 300 }).toString();
const number = faker.number.int({ min: 100000, max: 999999 }).toString();

const testParameters = [
  {
    payeeName: '',
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    phone: user.phone,
    accountNumber: number,
    verifyNumber: number,
    amount: amount,
    selectAccount: 0,
    message: PAYEE_NAME_REQUIRED,
    title: `empty 'Payee Name' field`,
  },
  {
    payeeName: `${user.firstName} ${user.lastName}`,
    address: '',
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    phone: user.phone,
    accountNumber: number,
    verifyNumber: number,
    amount: amount,
    selectAccount: 0,
    message: ADDRESS_REQUIRED,
    title: `empty 'Address' field`,
  },
  {
    payeeName: `${user.firstName} ${user.lastName}`,
    address: user.address,
    city: '',
    state: user.state,
    zipCode: user.zipCode,
    phone: user.phone,
    accountNumber: number,
    verifyNumber: number,
    amount: amount,
    selectAccount: 0,
    message: CITY_REQUIRED,
    title: `empty 'City' field`,
  },
  {
    payeeName: `${user.firstName} ${user.lastName}`,
    address: user.address,
    city: user.city,
    state: '',
    zipCode: user.zipCode,
    phone: user.phone,
    accountNumber: number,
    verifyNumber: number,
    amount: amount,
    selectAccount: 0,
    message: STATE_REQUIRED,
    title: `empty 'State' field`,
  },
  {
    payeeName: `${user.firstName} ${user.lastName}`,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: '',
    phone: user.phone,
    accountNumber: number,
    verifyNumber: number,
    amount: amount,
    selectAccount: 0,
    message: ZIP_CODE_REQUIRED,
    title: `empty 'Zip Code' field`,
  },
  {
    payeeName: `${user.firstName} ${user.lastName}`,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    phone: '',
    accountNumber: number,
    verifyNumber: number,
    amount: amount,
    selectAccount: 0,
    message: PHONE_REQUIRED,
    title: `empty 'Phone' field`,
  },
  {
    payeeName: `${user.firstName} ${user.lastName}`,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    phone: user.phone,
    accountNumber: '',
    verifyNumber: number,
    amount: amount,
    selectAccount: 0,
    message: [ACCOUNT_NUMBER_REQUIRED, NUMBERS_DO_NOT_MATCH],
    title: `empty 'Account' field`,
  },
  {
    payeeName: `${user.firstName} ${user.lastName}`,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    phone: user.phone,
    accountNumber: number,
    verifyNumber: '',
    amount: amount,
    selectAccount: 0,
    message: ACCOUNT_NUMBER_REQUIRED,
    title: `empty 'Verify Account' field`,
  },
  {
    payeeName: `${user.firstName} ${user.lastName}`,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    phone: user.phone,
    accountNumber: '',
    verifyNumber: '',
    amount: amount,
    selectAccount: 0,
    message: ACCOUNT_NUMBER_REQUIRED,
    title: `both empty 'Account' and 'Verify Account' fields`,
  },
  {
    payeeName: `${user.firstName} ${user.lastName}`,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    phone: user.phone,
    accountNumber: '000000',
    verifyNumber: number,
    amount: amount,
    selectAccount: 0,
    message: NUMBERS_DO_NOT_MATCH,
    title: `mismatched 'Account' and 'Verify Account' fields`,
  },
  {
    payeeName: `${user.firstName} ${user.lastName}`,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    phone: user.phone,
    accountNumber: number,
    verifyNumber: number,
    amount: '',
    selectAccount: 0,
    message: EMPTY_AMOUNT,
    title: `empty 'Amount' field`,
  },
];

test.describe(`'Bill Pay' negative tests`, () => {
  testParameters.forEach(({ 
      payeeName, 
      address, 
      city, 
      state, 
      zipCode, 
      phone, 
      accountNumber,
      verifyNumber,
      amount,
      selectAccount, 
      message, 
      title, 
    }) => {
    test(`Send a payment with ${title}`, async ({ billPayPage }) => {
      await billPayPage.open();
      await billPayPage.fillPayeeNameField(payeeName);
      await billPayPage.fillAddressField(address);
      await billPayPage.fillCityField(city);
      await billPayPage.fillStateField(state);
      await billPayPage.fillZipCodeField(zipCode);
      await billPayPage.fillPhoneField(phone);
      await billPayPage.fillAccountField(accountNumber);
      await billPayPage.fillVerifyAccountField(verifyNumber);
      await billPayPage.fillAmountField(amount);
      await billPayPage.selectAccount(selectAccount);
      await billPayPage.clickSendPaymentButton();
      await billPayPage.assertErrorMessageIsVisible(message);
    });
  });
});