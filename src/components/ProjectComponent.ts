import { Locator } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class ProjectComponent extends BaseComponent {
  // Locators
  readonly projectDetails = (): Locator => this.page.locator('#content');
  readonly projectHeader = (): Locator => this.page.getByTestId('large-header');
  readonly addTaskButton = (): Locator => this.projectDetails().getByRole('button', { name: 'Dodaj zadanie' });

  // Actions
  async addTask(name: string, description: string): Promise<void> {
    await this.addTaskButton().click();
    await this.projectDetails().locator('form').getByLabel('Nazwa zadania').fill(name);
    await this.projectDetails().locator('form').getByLabel('Opis').fill(description);
    await this.projectDetails().getByTestId('task-editor-submit-button').click();
  }
}
