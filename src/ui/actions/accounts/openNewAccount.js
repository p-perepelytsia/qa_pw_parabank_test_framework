import { testStep } from "../../../common/helpers/pwHelpers";
import { OpenNewAccountPage } from "../../pages/accounts/OpenNewAccountPage";

export async function openNewAccount(page, accountType, accoundId, userId = 0) {
  let accountNumber;
  let amount;

  await testStep(`Open new account`, async () => {
      const openNewAccountPage = new OpenNewAccountPage(page, userId);

      await openNewAccountPage.open();
      await openNewAccountPage.submitNewAccountCreation(accountType, accoundId);
      await openNewAccountPage.assertAccoutOpeningSuccess();

      accountNumber = await openNewAccountPage.getCreatedAccountNumber();
      amount = await openNewAccountPage.getMinimumDepositAmount();
    },
    userId,
  );

  return { accountNumber, amount };
}
