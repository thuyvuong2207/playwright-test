import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly headerNavFirst: Locator;
  readonly logoLink: Locator;
  readonly searchBar: Locator;
  readonly location: Locator;
  readonly phoneNumber: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerNavFirst = page.locator('.header-nav li').first();
    this.logoLink = page.locator('.logo a');
    this.searchBar = page.locator('//input[contains(@class,\'search-field\')]').nth(0);
    this.location = page.locator('.item-select-location .bs-connect-map-text').first();
    this.phoneNumber = page.locator('.location-phone-wrapper a');
  }

  async getHeaderNavFirstText() {
    return this.headerNavFirst.textContent();
  }
  async getLogoTitle() {
    return this.logoLink.getAttribute('title');
  }
  async getHeaderItemText() {
    return this.page.locator('//div[@class=\'header-main \']//a[@class=\'nav-top-link\']').allTextContents();
  }
  async getHeaderCategoryText() {
    return this.page.locator('//div[contains(@class,\'header-bottom\')]//a[@class=\'nav-top-link\']').allTextContents();
  }
}
