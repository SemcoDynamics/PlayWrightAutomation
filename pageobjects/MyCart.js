const {expect} = require('@playwright/test');

class MyCart {
    constructor(page)
    {
        this.page = page;
        this.clickCheckoutBtn = page.locator("text=Checkout");

    }
    async waitForMyCart()
    {
        await this.page.locator("div li").first().waitFor();
        const bool = await this.page.locator('h3:has-text("zara coat 3")').isVisible();
        expect(bool).toBeTruthy();
    }
    async clickCheckout()
    {
        await this.clickCheckoutBtn.click();
        await this.page.waitForLoadState("networkidle");
    }
}
module.exports = {MyCart};