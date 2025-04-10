import { expect, test } from '@playwright/test';

test('should create a new project', { tag: '@project' }, async ({ page }) => {
  await page.goto('https://app.todoist.com/app/today');
  await expect(page).toHaveURL('https://app.todoist.com/app/today');
  await expect(page).toHaveTitle(/Dziś/);

  const leftMenu = page.getByTestId('app-sidebar-container');
  await leftMenu.getByRole('button', { name: 'Menu Moje projekty ' }).click();
  await page.getByLabel('Dodaj projekt').click();

  const addProjectForm = page.getByTestId('modal-overlay').locator('form');
  await expect(addProjectForm).toBeVisible();

  await addProjectForm.locator('input[name="name"]').fill('Test project');
  // const colorPicker = addProjectForm.locator('button[aria-labelledby="edit_project_modal_field_color_label"]');
  const colorPicker = addProjectForm.locator('div[role=combobox]');
  await colorPicker.click();
  // const projectColorSelector = page.locator('div .popper');
  const projectColorSelector = page.locator('.form_field div[role=dialog]');
  await expect(projectColorSelector).toBeVisible();
  await projectColorSelector.getByText('Intensywny czerwony').click();
  await addProjectForm.getByRole('button', { name: 'Dodaj' }).click();

  const projectList = page.locator('#projects_list');

  await expect(projectList.locator('li').first()).toHaveText('Test project');

  const projectTitle = page.getByTestId('large-header');
  // eslint-disable-next-line playwright/max-expects
  await expect(projectTitle).toHaveText('Test project');
});
