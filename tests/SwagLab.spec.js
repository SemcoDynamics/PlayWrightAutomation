const {test, expect} = require('@playwright/test');

test("Swag labs login", async ({page}) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').type("standard_user");
    await page.locator('[data-test="password"]').type("secret_sauce");
    await page.locator('[data-test="login-button"]').click()
})