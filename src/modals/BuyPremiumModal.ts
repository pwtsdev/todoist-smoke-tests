import { Locator } from '@playwright/test';
import { BaseModal } from './BaseModal';

export class BuyPremiumModal extends BaseModal {
  // Locators
  readonly modal = (): Locator => this.page.getByTestId('modal-overlay');
  readonly header = (): Locator => this.modal().locator('#contextual-modal-title');

  // Actions
  async close(): Promise<void> {
    await this.modal().getByLabel('Zamknij okno').click();
  }
}
