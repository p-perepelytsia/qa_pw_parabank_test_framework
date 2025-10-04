import { test as base } from '@playwright/test';
import { SignUpPage } from '../../src/ui/pages/auth/SignUpPage';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { ForgotLoginPage } from '../../src/ui/pages/auth/ForgotLoginPage';

export const test = base.extend<{
  signUpPage;
  signInPage;
  forgotLoginPage;
}>({
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);

    await use(signUpPage);
  },
  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);

    await use(signInPage);
  },
  forgotLoginPage: async ({ page }, use) => {
    const forgotLoginPage = new ForgotLoginPage(page);

    await use(forgotLoginPage);
  },
});