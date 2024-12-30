import { expect, test } from '@playwright/test';

test('login to todoist account', async ({ page }) => {
  await page.goto('https://app.todoist.com/auth/login');

  await page.getByPlaceholder('Wpisz swój e-mail...').fill('bartek@pwts.dev');
  await page.getByPlaceholder('Wpisz hasło...').fill('K!V5n4FJ@G7Hto$jj&7$');
  await page.getByRole('button', { name: 'Logowanie' }).click();

  await expect(page).toHaveURL('https://app.todoist.com/app/today');
  await expect(page).toHaveTitle(/Dziś/);
});
