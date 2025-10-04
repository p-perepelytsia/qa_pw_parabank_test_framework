import { expect, testStep } from "../../../common/helpers/pwHelpers";

export class SignInPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.usernameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
    this.logOutButton = page.getByRole('link', { name: 'Log Out' });
    this.thisCustomerLoginForm = page.getByRole('heading', { name: 'Customer Login' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Sign in' page`, async () => {
      await this.page.goto('/parabank/index.htm');
    });
  }

  async fillUsernameField(username) {
    await this.step(`Fill the 'Username' field`, async () => {
      await this.usernameField.fill(username);
    });
  }

  async fillPasswordField(password) {
    await this.step(`Fill the 'Password' field`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async clickLoginButton() {
    await this.step(`Click the 'Log In' button`, async () => {
      await this.loginButton.click();
    });
  }
  
  async assertAccountsOverviewPageIsVisible() {
    await this.step(`Assert that 'Accounts Overview' page is visible`, async () => {
      await expect(this.page).toHaveURL(/.*\/parabank\/overview\.htm/);
      await expect(this.page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();
    });
  }

  async assertErrorMessageIsVisible(message) {
    await this.step(`Assert the '${message}' message is visible`, async () => {
      const errorMessage = this.page.getByText(`${message}`);
      await expect(errorMessage).toHaveText(message);
    });
  }

  async clickLogOutButton() {
    await this.step(`Click the 'Log Out' button`, async () => {
      await this.logOutButton.click();
    });
  }

  async assertCustomerLoginFormIsVisible() {
    await this.step(`Assert the 'Customer Login' form is visible`, async () => {
      await expect(this.thisCustomerLoginForm).toBeVisible();
    });
  }
}