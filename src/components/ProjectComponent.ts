import { Locator } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class ProjectComponent extends BaseComponent {
  // Locators
  readonly projectHeader = (): Locator => this.page.getByTestId('large-header');
}
