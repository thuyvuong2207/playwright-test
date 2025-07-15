import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly headerNavFirst: Locator;
  readonly logoLink: Locator;
  readonly searchBar: Locator;
  readonly location: Locator;
  readonly phoneNumber: Locator;
  readonly btnCreateAccount: Locator;
  readonly copyrightFooter: Locator;
  readonly breadstackCredit: Locator;
  readonly breadstackCreditURL: Locator
  readonly expectedBreadstackCreditURL: string = 'https://breadstack.com/';
  readonly expectedCreateAccountDropdownOptions: string[] = [
    'Sign up',
    'Log In'];
  readonly expectedHeaderCategory: string[] = ['Flower', 'Pre-Rolls', "Infused Pre-Rolls & Flower", "Concentrates", 'Vaporizers', 'Extracts Ingested', 'Edibles', 'Beverages', 'Topicals', 'Accessories', 'Merchandise', 'SALE'];
  readonly expectedHeaderItems: string[] = ['Home', 'Shop', "Locations", "About", 'Contact Us', 'Resources'];


  constructor(page: Page) {
    this.page = page;
    this.headerNavFirst = page.locator('.header-nav li').first();
    this.logoLink = page.locator('.logo a');
    this.searchBar = page.locator('//input[contains(@class,\'search-field\')]').nth(0);
    this.location = page.locator('.bs-connect-map-text').first();
    this.phoneNumber = page.locator('a[href^="tel:"]');
    this.copyrightFooter = page.locator('.copyright-footer');
    this.breadstackCredit = page.locator('.breadstack-credits a b');
    this.breadstackCreditURL = page.locator('.breadstack-credits a');
    this.btnCreateAccount = page.locator('.account-item.has-icon.has-dropdown');

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
  async getLocationText() {
    return this.location.textContent();
  }
  async getPhoneNumber() {
    return this.phoneNumber.textContent();
  }
  async getCreateAccountDropdownOptions() {
    await this.btnCreateAccount.hover();
    const options = await this.page.locator('.account-not-logged-in-dropdown a').allTextContents();
    return options;
  }
}
