import { expect, test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test('should create a new project', { tag: '@project' }, async ({ page }) => {
  // Arrange
  const homePage = new HomePage(page);

  // Act
  await homePage.open();
  await homePage.leftPanel.addNewProject('Test project', 'Intensywny czerwony');

  const projectList = page.locator('#projects_list');

  await expect(projectList.locator('li').first()).toHaveText('Test project');

  const projectTitle = page.getByTestId('large-header');
  // eslint-disable-next-line playwright/max-expects
  await expect(projectTitle).toHaveText('Test project');
});
