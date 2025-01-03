import { Locator } from '@playwright/test';
import { BaseModal } from './BaseModal';

export class TaskModal extends BaseModal {
  // Locators
  readonly taskModal = (): Locator => this.page.getByTestId('task-details-modal');
}
