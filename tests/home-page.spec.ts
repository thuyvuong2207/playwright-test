import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AgeGate } from '../pages/AgeGate';

test.beforeEach(async ({ page }) => {
  await page.goto('https://tokecannabis.breadstackcrm.com/');
  await page.setViewportSize({ width: 1920, height: 1080 });
  const ageGate = new AgeGate(page);
  await ageGate.mdlAge.isVisible();
  await ageGate.btnYes.waitFor({ state: 'visible' });
  await ageGate.btnYes.click();
  await ageGate.btnPickUp.waitFor({ state: 'visible', timeout: 10000 });
  await ageGate.btnPickUp.click();
  await ageGate.btnRadioLocation('toke-niagara').waitFor({ state: 'visible', timeout: 5000 });
  await ageGate.btnRadioLocation('toke-niagara').click();
}
);

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

test('Verify Phone Number matching with Location', async ({ page }) => {
  const ageGate = new AgeGate(page);
  const homePage = new HomePage(page);
  const testCases = [
    { id: 'toke-niagara', location: 'Toke Niagara', phone: '289-296-1227' },
    { id: 'toke-toronto', location: 'Toke Toronto', phone: '416-530-7750' },
    { id: 'toke-st-catharines', location: 'Toke St Catharines', phone: '289-362-5885' },
    { id: 'toke-hamilton', location: 'Toke Hamilton', phone: '289-389-1885' },
    { id: 'toke-welland', location: 'Toke Welland', phone: '289-820-7464' },
    { id: 'toke-oakwood', location: 'Toke Oakwood', phone: '416-787-1792' },
    { id: 'toke-beamsville', location: 'Toke Beamsville', phone: '289-566-8474' },
    { id: 'toke-midland', location: 'Toke Midland', phone: '705-527-6728' },
  ];

  for (const testCase of testCases) {
    await homePage.location.waitFor({ state: 'visible' });
    await homePage.location.click();
    await ageGate.btnPickUp.waitFor({ state: 'visible', timeout: 10000 });
    await ageGate.btnPickUp.click();
    await ageGate.btnRadioLocation(testCase.id).waitFor({ state: 'visible', timeout: 5000 });
    await ageGate.btnRadioLocation(testCase.id).click();
    
    await homePage.location.waitFor({ state: 'visible' });
    await homePage.headerNavFirst.waitFor({ state: 'visible' });
    await homePage.phoneNumber.waitFor({ state: 'visible' });
    await page.waitForLoadState('networkidle');
    const phoneNumber = (await homePage.getPhoneNumber())?.trim();
    const location = (await homePage.getLocationText())?.trim();
    expect(location).toEqual(testCase.location);
    expect(phoneNumber).toEqual(testCase.phone);
    await page.reload();
  }
});