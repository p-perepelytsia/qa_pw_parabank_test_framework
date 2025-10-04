import { test } from "../../_fixtures/fixturesGeneric";
import { SignInPage } from "../../../src/ui/pages/auth/SignInPage";
import { signUpUser } from "../../../src/ui/actions/auth/signUpUser";

let signInPage;

test.use({ contextsNumber: 2 });

test.beforeEach(async ({ pages, user }) => {
  await signUpUser(pages[0], user);

  signInPage = new SignInPage(pages[1]);
});

test(`Successful 'Sign in' flow test`, async ({ user }) => {
  await signInPage.open();
  await signInPage.fillUsernameField(user.username);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickLoginButton();
  await signInPage.assertAccountsOverviewPageIsVisible();
});