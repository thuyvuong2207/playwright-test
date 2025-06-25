import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://tokecannabis.breadstackcrm.com/');
});

test('Verify Age Gate & Redirect to Home', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Password:' }).fill('breadstack');
  await page.getByRole('button', { name: 'Enter' }).click();

  const isAgeGateVisible = await page.locator('#age-gate-modal-content').isVisible();
  if (isAgeGateVisible) {
    await page.locator('#age-gate-modal-content').isVisible();
    await page.locator('warning-msg').isVisible();
    await page.getByRole('button', { name: 'No, I\'m not' }).click();
    await page.locator('#err-msg-age').isVisible();
    await expect(page.locator('#err-msg-age')).toHaveText('We only sell to adults age 19 years or older.');
    await page.getByRole('button', { name: 'Yes, I am' }).click();

    expect(await page.locator('.header-nav li').first().textContent()).toEqual('Home');
    expect(await page.locator('.logo a').getAttribute('title')).toBe('Toke Cannabis - Recreational Weed Dispensary With Fast Delivery');
    expect(await page.locator('.logo a img').first().getAttribute('src')).toBe('https://tokecannabis.breadstackcrm.com/wp-content/uploads/2025/06/Toke-Logo.svg');
  } else {
    expect(await page.locator('.header-nav li').first().textContent()).toEqual('Home');
    expect(await page.locator('.logo a').getAttribute('title')).toBe('Toke Cannabis - Recreational Weed Dispensary With Fast Delivery');
    expect(await page.locator('.logo a img').first().getAttribute('src')).toBe('https://tokecannabis.breadstackcrm.com/wp-content/uploads/2025/06/Toke-Logo.svg');
  }
});

test('Verify Home', async ({ page }) => {


})
