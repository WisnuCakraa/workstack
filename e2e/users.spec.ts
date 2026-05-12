import { test, expect } from '@playwright/test';

test.describe('Users Happy Path', () => {
  test('should navigate from list to user details', async ({ page }) => {
    await page.goto('/');

    await page.click('text=Browse Users');
    await expect(page).toHaveURL('/users');

    const table = page.locator('table');
    await expect(table).toBeVisible();

    const firstRow = page.getByTestId('user-row').first();
    const firstLink = firstRow.locator('a').first();
    const userName = await firstLink.textContent();
    await firstLink.click();

    await expect(page).toHaveURL(/\/users\/\d+/);

    if (userName) {
      await expect(page.locator('h1')).toHaveText(userName.trim());
    }
    await expect(page.locator('text=Posts')).toBeVisible();
    await expect(page.locator('text=Tasks')).toBeVisible();

    await page.locator('a[href="/users"]').click();
    await expect(page).toHaveURL('/users');
  });

  test('should search and filter users', async ({ page }) => {
    await page.goto('/users');

    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('Chelsey Dietrich');

    await expect(page.locator('text=Chelsey Dietrich').first()).toBeVisible();
    await expect(page.getByTestId('user-row')).toHaveCount(1);

    await page.getByTestId('search-clear').click();
    await expect(page.getByTestId('user-row')).toHaveCount(5);
  });

  test('should paginate through user list', async ({ page }) => {
    await page.goto('/users');

    await expect(page.getByTestId('user-row')).toHaveCount(5);

    await expect(page.getByTestId('pagination')).toBeVisible();
    await expect(page.getByTestId('pagination-page-1')).toBeVisible();
    await expect(page.getByTestId('pagination-page-2')).toBeVisible();

    await expect(page.getByTestId('pagination-prev')).toBeDisabled();

    const page1FirstUser = await page.getByTestId('user-row').first().locator('td').first().textContent();

    await page.getByTestId('pagination-next').click();
    await expect(page).toHaveURL(/page=2/);

    await expect(page.getByTestId('user-row')).toHaveCount(5);

    const page2FirstUser = await page.getByTestId('user-row').first().locator('td').first().textContent();
    expect(page2FirstUser).not.toBe(page1FirstUser);

    await expect(page.getByTestId('pagination-next')).toBeDisabled();

    await page.getByTestId('pagination-page-1').click();
    await expect(page).toHaveURL(/page=1/);
    await expect(page.getByTestId('user-row')).toHaveCount(5);
  });
});
