import { Page, Locator } from '@playwright/test';

export class AgeGate {
  readonly page: Page;
  readonly mdlAge: Locator;
  readonly msgWarning: Locator;
  readonly btnNo: Locator;
  readonly btnYes: Locator;
  readonly msgError: Locator;
  readonly headerHome: Locator;
  readonly headerTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mdlAge = page.locator('#age-gate-modal-content');
    this.msgWarning = page.locator('warning-msg');
    this.btnNo = page.getByRole('button', { name: 'No, I\'m not' });
    this.btnYes = page.getByRole('button', { name: 'Yes, I am' });
    this.msgError = page.locator('#err-msg-age');
    this.headerHome = page.locator('.header-nav li').first();
    this.headerTitle = page.locator('.logo a');
  }
}
