import { expect, test } from '@playwright/test';

test('should create a new project', { tag: '@project' }, async ({ page }) => {
  await page.goto('https://app.todoist.com/app/today');
  await expect(page).toHaveURL('https://app.todoist.com/app/today');
  await expect(page).toHaveTitle(/Dziś/);

  const leftMenu = page.getByTestId('app-sidebar-container');
  await leftMenu.getByRole('button', { name: 'Menu Moje projekty ' }).click();
  await page.getByLabel('Dodaj projekt').click();

  await page.waitForTimeout(5000);
});
