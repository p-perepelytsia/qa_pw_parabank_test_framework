import { expect, testStep } from "../../../common/helpers/pwHelpers";

export class SignUpPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.firstNameField = page.locator('[id="customer\\.firstName"]');
    this.lastNameField = page.locator('[id="customer\\.lastName"]');
    this.addressField = page.locator('[id="customer\\.address\\.street"]');
    this.cityField = page.locator('[id="customer\\.address\\.city"]');
    this.stateField = page.locator('[id="customer\\.address\\.state"]');
    this.zipCodeField = page.locator('[id="customer\\.address\\.zipCode"]');
    this.phoneField = page.locator('[id="customer\\.phoneNumber"]');
    this.ssnField = page.locator('[id="customer\\.ssn"]');
    this.usernameField = page.locator('[id="customer\\.username"]');
    this.passwordField = page.locator('[id="customer\\.password"]');
    this.confirmPasswordField = page.locator('#repeatedPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Sign Up' page`, async () => {
      await this.page.goto('/parabank/register.htm');
    });
  }

  async fillFirstNameField(firstName) {
    await this.step(`Fill the 'First Name' field`, async () => {
      await this.firstNameField.fill(firstName);
    });
  }

  async fillLastNameField(lastName) {
    await this.step(`Fill the 'Last Name' field`, async () => {
      await this.lastNameField.fill(lastName);
    });
  }

  async fillAddressField(address) {
    await this.step(`Fill the 'Address' field`, async () => {
      await this.addressField.fill(address);
    });
  }

  async fillCityField(city) {
    await this.step(`Fill the 'City' field`, async () => {
      await this.cityField.fill(city);
    });
  }

  async fillStateField(state) {
    await this.step(`Fill the 'State' field`, async () => {
      await this.stateField.fill(state);
    });
  }

  async fillZipCodeField(zipCode) {
    await this.step(`Fill the 'Zip Code' field`, async () => {
      await this.zipCodeField.fill(zipCode);
    });
  }

  async fillPhoneField(phone) {
    await this.step(`Fill the 'Phone' field`, async () => {
      await this.phoneField.fill(phone);
    });
  }

  async fillSsnField(ssn) {
    await this.step(`Fill the 'SNN' field`, async () => {
      await this.ssnField.fill(ssn);
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

  async fillConfirmPasswordField(password) {
    await this.step(`Fill the 'Confirm Password' field`, async () => {
      await this.confirmPasswordField.fill(password);
    });
  }

  async submitSignUpForm(user) {
    await this.step(`Submit the 'Sign Up' form`, async () => {
      await this.fillFirstNameField(user.firstName);
      await this.fillLastNameField(user.lastName);
      await this.fillAddressField(user.address);
      await this.fillCityField(user.city);
      await this.fillStateField(user.state);
      await this.fillZipCodeField(user.zipCode);
      await this.fillPhoneField(user.phone);
      await this.fillSsnField(user.ssn);
      await this.fillUsernameField(user.username);
      await this.fillPasswordField(user.password);
      await this.fillConfirmPasswordField(user.password);
      await this.clickRegisterButton();
    });
  }

  async clickRegisterButton() {
    await this.step(`Click the 'Register' button`, async () => {
      await this.registerButton.click();
    });
 }

 async assertWelcomeMessageIsVisible(username) {
    await this.step(`Assert the welcome message is visible`, async () => {
      const welcomeHeading = this.page.getByRole('heading', { name: `Welcome ${username}` })
      await expect(welcomeHeading).toBeVisible();
    });
  }

  async assertErrorMessageIsVisible(message) {
    await this.step(`Assert the '${message}' message is visible`, async () => {
      const errorMessage = this.page.getByText(`${message}`);
      await expect(errorMessage).toHaveText(message);
    });
  }
}