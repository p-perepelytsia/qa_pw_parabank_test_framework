import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class ForgotLoginPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.firstNameField = page.locator('#firstName');
    this.lastNameField = page.locator('#lastName');
    this.addressField = page.locator('[id="address\\.street"]');
    this.cityField = page.locator('[id="address\\.city"]');
    this.stateField = page.locator('[id="address\\.state"]');
    this.zipCodeField = page.locator('[id="address\\.zipCode"]');
    this.ssnField = page.locator('#ssn');
    this.findMyLoginInfoButton = page.getByRole('button', { name: 'Find My Login Info' });
    this.loggedInMessage = page.getByText('Your login information was located successfully. You are now logged in.');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Forgot Login Info' page`, async () => {
      await this.page.goto('/parabank/lookup.htm');
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

  async fillSsnField(ssn) {
    await this.step(`Fill the 'SSN' field`, async () => {
      await this.ssnField.fill(ssn);
    });
  }

  async clickFindMyLoginInfoButton() {
    await this.step(`Click the 'Find My Login Info' button`, async () => {
      await this.findMyLoginInfoButton.click();
    });
 }

 async assertLoggedInMessageIsVisible() {
    await this.step(`Assert the logged in message is visible`, async () => {
      await expect(this.loggedInMessage).toBeVisible();
    });
  }

 async assertLoginDataIsCorrect(username, password) {
    await this.step(`Assert that login data is correct`, async () => {
      const loginData = this.page.getByText(`Username: ${username} Password: ${password}`);
      await expect(loginData).toHaveText(`Username: ${username} Password: ${password}`);
    });
 }

 async assertErrorMessageIsVisible(message) {
    await this.step(`Assert the '${message}' message is visible`, async () => {
      const errorMessage = this.page.getByText(`${message}`);
      await expect(errorMessage).toHaveText(message);
    });
 }
}
