import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AgeGate } from '../pages/AgeGate';

test.beforeEach(async ({ page }) => {
  await page.goto('https://tokecannabis.breadstackcrm.com/');
});

test('Verify Age Gate & Redirect to Home', async ({ page }) => {
  const ageGate = new AgeGate(page);
  const isAgeGateVisible = await ageGate.mdlAge.isVisible();
  if (isAgeGateVisible) {
    await expect(ageGate.mdlAge).toBeVisible();
    await expect(ageGate.msgWarning).toBeVisible();
    await ageGate.btnNo.click();
    await expect(ageGate.msgError).toBeVisible();
    await expect(page.locator('#err-msg-age')).toHaveText('We only sell to adults age 19 years or older.');
    await ageGate.btnYes.click();

    expect(await ageGate.headerHome.textContent()).toEqual('Home');
    expect(await ageGate.headerTitle.getAttribute('title')).toBe('Toke Cannabis - Recreational Weed Dispensary With Fast Delivery');
  } else {
    expect(await ageGate.headerHome.textContent()).toEqual('Home');
    expect(await ageGate.headerTitle.getAttribute('title')).toBe('Toke Cannabis - Recreational Weed Dispensary With Fast Delivery');
  }
});

test('Verify Header Navigation Items', async ({ page }) => {
  const homePage = new HomePage(page);
  const actualHeaderItems = await homePage.getHeaderItemText();
  const expectedHeaderItems = ['Home', 'Shop', "Locations", "About", 'Contact Us', 'Resources'];
  expect(actualHeaderItems).toEqual(expectedHeaderItems);
});

test('Verify Header Bottom Categories', async ({ page }) => {
  const homePage = new HomePage(page);
  const actualHeaderCategory = await homePage.getHeaderCategoryText();
  const expectedHeaderCategory = ['Flower', 'Pre-Rolls', "Infused Pre-Rolls & Flower", "Concentrates", 'Vaporizers', 'Extracts Ingested', 'Edibles', 'Beverages', 'Topicals', 'Accessories', 'Merchandise', 'SALE'];
  expect(actualHeaderCategory).toEqual(expectedHeaderCategory);
});

test.only('Verify Phone Number matching with Location', async ({ page }) => {
  const homePage = new HomePage(page);
  const phoneNumber = await homePage.phoneNumber.getAttribute('href');
  const location = await homePage.location.textContent();

  switch (location) {
    case 'Niagara':
      expect(phoneNumber?.replace('tel:', "")).toBe('289-296-1227');
    case 'Toronto':
      expect(phoneNumber?.replace('tel:', "")).toBe('416-530-7750');
    case 'St. Catharines':
      expect(phoneNumber?.replace('tel:', "")).toBe('289-362-5885');
    case 'Hamilton':
      expect(phoneNumber?.replace('tel:', "")).toBe('289-389-1885');
    case 'Welland':
      expect(phoneNumber?.replace('tel:', "")).toBe('289-820-7464');
    case 'Oakwood':
      expect(phoneNumber?.replace('tel:', "")).toBe('416-787-1792');
    case 'Beamsville':
      expect(phoneNumber?.replace('tel:', "")).toBe('289-566-8474');
    case 'Midland':
      expect(phoneNumber?.replace('tel:', "")).toBe('705-527-6728');
    // default:
    //   throw Error(`Unexpected location: "${location}"`);
  }
})