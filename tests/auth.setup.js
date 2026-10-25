import {test as setup, expect} from '@playwright/test';

setup ('authenticate', async({page}) => {

    await page.goto('https://the-internet.herokuapp.com/login');
    await page.getByRole('textbox',{name:'Username' })
        .fill('tomsmith');
    await page
        .getByRole('textbox', { name: 'Password' })
        .fill('SuperSecretPassword!');

    await page
        .getByRole('button', { name: /Login/ })
        .click();
        await expect(page).toHaveURL(/\/secure/);
    await expect (page.getByText('You logged into a secure area',{exact:false})).toBeVisible();
    await expect (page.getByRole('link', { name: 'Logout' })).toBeVisible();
    await page.context().storageState({
    path: 'playwright/.auth/user.json'
});

});