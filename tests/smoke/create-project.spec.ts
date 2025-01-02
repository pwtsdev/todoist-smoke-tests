import { expect, test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test('should create a new project', { tag: '@project' }, async ({ page }) => {
  // Arrange
  const homePage = new HomePage(page);

  // Act
  await homePage.open();
  await homePage.leftPanel.addNewProject('Test project', 'Intensywny czerwony');

  // Assert
  await expect(homePage.leftPanel.getProjectByName('Test project')).toBeVisible();
});
