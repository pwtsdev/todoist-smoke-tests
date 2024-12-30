import { expect, test } from '@playwright/test';

test.skip('login to todoist account', async ({ page }) => {
  await page.goto('https://app.todoist.com/auth/login');

  const email = process.env.USER_EMAIL;
  const password = process.env.USER_PASSWORD;

  if (!email || !password) {
    throw new Error('🛑 Missing USER_EMAIL or USER_PASSWORD in .env file!');
  }

  await page.getByPlaceholder('Wpisz swój e-mail...').fill(email);
  await page.getByPlaceholder('Wpisz hasło...').fill(password);
  await page.getByRole('button', { name: 'Logowanie' }).click();

  await expect(page).toHaveURL('https://app.todoist.com/app/today');
  await expect(page).toHaveTitle(/Dziś/);

  await page.context().storageState({ path: 'tmp/login.json' });
});

test.skip('should be logged in', async ({ page }) => {
  await page.goto('https://app.todoist.com/app/today');
  await expect(page).toHaveURL('https://app.todoist.com/app/today');
  await expect(page).toHaveTitle(/Dziś/);
});
