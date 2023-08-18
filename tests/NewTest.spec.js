const {test, expect} = require('@playwright/test');

test("SignIn to Luma", async ({page}) => {

   await page.goto("https://magento.softwaretestingboard.com/");
   await page.locator("ul.header.links li.authorization-link").nth(0).click();
   await page.locator('input[name="login[username]"]').fill("semcodynamics@gmail.com");
   await page.locator('input[name="login[password]"]').fill('Legend27!');
   await page.locator('button[type="submit"].action.login.primary').click();
});