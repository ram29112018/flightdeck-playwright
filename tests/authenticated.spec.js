import { test, expect } from '@playwright/test';

test('authenticated user can access secure area', async ({ page, context }) => {

    const cookies = await context.cookies();

    console.log(
        'Cookie names:',
        cookies.map(cookie => cookie.name)
    );

    await page.goto('https://the-internet.herokuapp.com/secure');

    console.log('Final URL:', page.url());

    await expect(page).toHaveURL(/\/secure/);
});