import defineWalletSetup from '../wallet-setup/basic.setup';
import { testWithSynpress } from '@synthetixio/synpress'
import { MetaMask, metaMaskFixtures } from '@synthetixio/synpress/playwright'
import basicSetup from '../wallet-setup/basic.setup';

const test = testWithSynpress(metaMaskFixtures(basicSetup));

const { expect } = test;

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Tsender/);
});

test('shows airdrop form', async ({ page, context, metamaskPage, extensionId }) => {
  // Check we see "Please connect a wallet ..."
  await page.goto('/');
  await expect(page.getByText('Please connect a wallet ...')).toBeVisible();

  const metamask = new MetaMask(context, metamaskPage, basicSetup.password, extensionId);
  await page.getByTestId('rk-connect-button').click(); 
  await page.getByTestId('rk-wallet-option-io.metamask').waitFor({ state: 'visible' }, { timeout: 30000 });
  await page.getByTestId('rk-wallet-option-io.metamask').click();
  await metamask.connectToDapp();

  await metamaskPage.getByRole('button', { name: 'Approve' }).waitFor({ state: 'visible' });
  await metamaskPage.getByRole('button', { name: 'Approve' }).click();

  await metamaskPage.getByRole('button', { name: 'Switch network' }).waitFor({ state: 'visible' });
  await metamaskPage.getByRole('button', { name: 'Switch network' }).click();

  await expect(page.getByText("Token Address")).toBeVisible();

});
