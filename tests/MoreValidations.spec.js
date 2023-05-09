const {test, expect} = require('@playwright/test');

test("More Validations", async ({page})=> {
    //This script handles hidden/show fields
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator('#hide-textbox').click();
    await expect(page.locator("input#displayed-text")).toBeHidden();
    await page.locator("#show-textbox").click();
    await expect(page.locator('input#displayed-text')).toBeVisible();
    //await page.pause();
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover();
    await page.locator(".mouse-hover-content a:nth-child(1)").click();

    //When handling Iframes we create a frameLocator
    const iframePage = page.frameLocator("#courses-iframe");
    await iframePage.locator('.main-menu li a[href="lifetime-access"]:visible').click();
    const textCheck = await iframePage.locator(".text h2").textContent();
    //This splits next by space then the index is selected to select the character.
    console.log(textCheck.split(" ")[1]);
})