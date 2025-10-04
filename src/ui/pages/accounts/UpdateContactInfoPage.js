import { expect, testStep } from "../../../common/helpers/pwHelpers";

export class UpdateContactInfoPage {
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
    this.updateProfileButton = page.getByRole('button', { name: 'Update Profile' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Update Profile' page`, async () => {
      await this.page.goto('/parabank/updateprofile.htm');
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

  async clickUpdateProfileButton() {
    await this.step(`Click the 'Update Profile' button`, async () => {
      await this.updateProfileButton.click();
    });
 }

 async assertOldDataIsVisible(oldData) {
    await this.step(`Assert old contact information is visible`, async () => {
      await expect(this.firstNameField).toHaveValue(oldData.firstName);
      await expect(this.lastNameField).toHaveValue(oldData.lastName);
      await expect(this.addressField).toHaveValue(oldData.address);
      await expect(this.cityField).toHaveValue(oldData.city);
      await expect(this.stateField).toHaveValue(oldData.state);
      await expect(this.zipCodeField).toHaveValue(oldData.zipCode);
      await expect(this.phoneField).toHaveValue(oldData.phone);
    });
 }

  async assertErrorMessageIsVisible(message) {
    await this.step(`Assert the '${message}' message is visible`, async () => {
      const errorMessage = this.page.getByText(`${message}`);
      await expect(errorMessage).toHaveText(message);
    });
  }

  async assertUpdatingInformationSuccess() {
    await this.step(`Assert account information updated successfully`, async () => {
      await expect(this.page.getByRole('heading', { name: 'Profile Updated' })).toBeVisible({ timeout: 15000 });
      await expect(this.page.locator('text=Your updated address and phone number have been added to the system.')).toBeVisible();
    });
  }
}