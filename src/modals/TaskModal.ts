import { expect, Locator } from '@playwright/test';
import { BaseModal } from './BaseModal';

export class TaskModal extends BaseModal {
  // Locators
  readonly taskModal = (): Locator => this.page.getByTestId('task-details-modal');
  readonly addCommentButton = (): Locator => this.taskModal().getByRole('button', { name: 'Skomentuj' });
  readonly attachmentButtons = (): Locator => this.taskModal().locator('.comments_textarea_holder button svg');
  readonly addFileButton = (): Locator => this.attachmentButtons().first();
  readonly addAudioButton = (): Locator => this.attachmentButtons().nth(2);

  // Actions
  async addComment(comment: string): Promise<void> {
    await this.taskModal().getByTestId('open-comment-editor-button').click();
    await expect(this.addCommentButton()).toBeVisible();

    await this.taskModal().getByLabel('Skomentuj').fill(comment);

    // UPLOAD FILE
    const uploadPromise = this.page.waitForEvent('filechooser');
    await this.addFileButton().click();
    const upload = await uploadPromise;
    await upload.setFiles('uploads/kod.png');
    await expect(this.taskModal().getByLabel('Usuń załącznik')).toBeVisible();
    await expect(this.taskModal().getByText(/kod.png/)).toBeVisible();

    await this.addCommentButton().click();

    const commentLocator = this.taskModal().locator(`div[class="note_content"]:has-text("${comment}")`).first();
    await expect(commentLocator).toBeVisible();

    await this.taskModal().getByLabel('Zamknij zadanie').click();
  }
}
