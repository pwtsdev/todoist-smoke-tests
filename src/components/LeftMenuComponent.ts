import { expect, Locator, Page } from '@playwright/test';
import { AddProjectModal } from '../modals/AddProjectModal';
import { BaseComponent } from './BaseComponent';

export class LeftMenuComponent extends BaseComponent {
  // Components
  private readonly addProjectModal: AddProjectModal;

  constructor(protected page: Page) {
    super(page);
    this.addProjectModal = new AddProjectModal(page);
  }

  // Locators
  private readonly leftMenuLocator = (): Locator => this.page.getByTestId('app-sidebar-container');
  private readonly allProjects = (): Locator => this.page.locator('#projects_list li');

  // Actions

  async openProjectsMenu(): Promise<void> {
    await this.leftMenuLocator().getByRole('button', { name: 'Menu Moje projekty ' }).click();
    await this.page.getByLabel('Dodaj projekt').click();
  }

  async addNewProject(name: string, color: string): Promise<void> {
    await this.openProjectsMenu();
    await expect(this.addProjectModal.addProjectForm()).toBeVisible();
    await this.addProjectModal.addNewProject(name, color);
  }

  async getAllProjectNames(): Promise<string[]> {
    return await this.allProjects().locator('a div span').allInnerTexts();
  }

  getProjectByName(name: string): Locator {
    return this.allProjects().locator(`a div span:has-text("${name}")`).first();
  }
}
