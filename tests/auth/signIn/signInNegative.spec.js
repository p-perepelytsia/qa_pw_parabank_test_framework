import { test } from '../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';
import { 
  ENTER_USERNAME_AND_PASSWORD,
  INVALID_CREDENTIALS,
 } from '../../../src/ui/constants/errorMessages';

const user = generateNewUserData();
const testParameters = [
  {
    username: user.username,
    password: '',
    message: ENTER_USERNAME_AND_PASSWORD,
    title: `empty 'Password' field`,
  },
  {
    username: '',
    password: user.password,
    message: ENTER_USERNAME_AND_PASSWORD,
    title: `empty 'Username' field`,
  },
  {
    username: '',
    password: '',
    message: ENTER_USERNAME_AND_PASSWORD,
    title: `emtpy 'Username' and 'Password' fields`,
  }
];

test.describe(`'Sign in' negative tests`, () => {
  testParameters.forEach(({ username, password, message, title}) => {
    test(`Sign in with ${title}`, async ({ signInPage }) => {
      await signInPage.open();
      await signInPage.fillUsernameField(username);
      await signInPage.fillPasswordField(password);
      await signInPage.clickLoginButton();
      await signInPage.assertErrorMessageIsVisible(message);
      });
    });

    test.use({ contextsNumber: 2 });
    test(`Sign in with invalid 'Password' field`, async ({ pages }) => {
      const existingUser = generateNewUserData();

      await signUpUser(pages[0], existingUser, 1);

      const signInPage = new SignInPage(pages[1], 2);

      await signInPage.open();
      await signInPage.fillUsernameField(existingUser.username);
      await signInPage.fillPasswordField(faker.internet.password());
      await signInPage.clickLoginButton();
      await signInPage.assertErrorMessageIsVisible(INVALID_CREDENTIALS);
    });
});