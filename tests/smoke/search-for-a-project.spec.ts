import { expect, test } from '../../src/fixtures/po.fixture';
import { CreateProjectModel } from '../../src/models/create-project.model';

test.afterEach(async ({ homePage }) => {
  await homePage.leftPanel.deleteAllProjects();
});

test.describe('Search', () => {
  test('find and existing project', { tag: ['@smoke', '@smoke003'] }, async ({ homePage }) => {
    // Arrange
    const projects: CreateProjectModel[] = [
      { name: 'WORK', color: 'Łosoś' },
      { name: 'BILLS', color: 'Łosoś' },
      { name: 'HOLIDAYS', color: 'Łosoś' },
    ];

    // Act
    await test.step('create new project', async () => {
      await homePage.open();
      for (const project of projects) {
        await homePage.leftPanel.addNewProject(project);
        await expect(homePage.leftPanel.getProjectByName(project.name)).toBeVisible();
      }
    });

    await test.step('find and existing project', async () => {
      await homePage.leftPanel.searchForAProject('WORK');
    });

    // Assert
  });
});
