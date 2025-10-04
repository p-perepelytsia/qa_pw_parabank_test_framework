import { testStep } from "../../../common/helpers/pwHelpers";
import { SignUpPage } from "../../pages/auth/SignUpPage";

export async function signUpUser(page, user, userId = 0) {
  await testStep(`Sign up user`, async () => {
      const signUpPage = new SignUpPage(page, userId);

      await signUpPage.open();
      await signUpPage.submitSignUpForm(user);

      await signUpPage.assertWelcomeMessageIsVisible(user.username);
    },
    userId,
  );
}