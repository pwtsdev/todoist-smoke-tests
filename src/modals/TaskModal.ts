import { expect, Locator } from '@playwright/test';
import { BaseModal } from './BaseModal';

export class TaskModal extends BaseModal {
  // Locators
  readonly taskModal = (): Locator => this.page.getByTestId('task-details-modal');
  readonly addCommentButton = (): Locator => this.taskModal().getByRole('button', { name: 'Skomentuj' });

  // Actions
  async addComment(comment: string): Promise<void> {
    await this.taskModal().getByTestId('open-comment-editor-button').click();
    await expect(this.addCommentButton()).toBeVisible();

    await this.taskModal().getByLabel('Skomentuj').fill(comment);
    await this.addCommentButton().click();

    const commentLocator = this.taskModal().locator(`div[class="note_content"]:has-text("${comment}")`).first();
    await expect(commentLocator).toBeVisible();

    await this.taskModal().getByLabel('Zamknij zadanie').click();
  }
}
