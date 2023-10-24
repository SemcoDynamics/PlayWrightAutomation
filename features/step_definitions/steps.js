const {Given, When, Then } = require('@cucumber/cucumber')
const {test, expect,} = require('@playwright/test');
const playwright = require('@playwright/test');

  Given('a login to Ecommerce application with username and password',{timeout : 100*1000}, async function () {
  // Write code here that turns the phrase above into concrete actions
    const browser = await playwright.chromium.launch({
      headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    //Going to Sauce demo URL
    await this.page.goto("https://www.saucedemo.com/");
    //Entering username
    await this.page.locator('[data-test="username"]').type('standard_user');
    //Entering passowrd
    await this.page.locator('[data-test="password"]').type('secret_sauce');
    //Clicking button
    await this.page.locator('[data-test="login-button"]').click();
    //loadstate
    await this.page.waitForLoadState("networkidle");
  });

  When('select product Sauce Labs Onesie and add to cart', async function () {
    // Write code here that turns the phrase above into concrete actions
    //Locator highlights all products
    const allProducts = this.page.locator('.inventory_list .inventory_item');
    //Title highlights all product titles
    const productTitle = this.page.locator('.inventory_item_description .inventory_item_name');
    //Add to Cart button
    const addToCartBtn = this.page.locator('button.btn');
    //Selects all products and finds "Sauce labs Onesie" and clicks add to cart button
    const productCount = await allProducts.count();
    for (let i = 0; i < productCount; i++)
    {
        const onesie = await productTitle.nth(i).textContent()
        if(onesie.trim() === "Sauce Labs Onesie")
        {
            console.log(onesie)
            await addToCartBtn.nth(i).click()
            break;
        }
    }
    
  });

  Then('verify that the CartBadge has one item in it', async function () {
    // Write code here that turns the phrase above into concrete actions
     //Add to cart Icon badge locator
     const cartBadge = this.page.locator('a.shopping_cart_link span.shopping_cart_badge');
     //Verfies that one item is in the cart.
     await expect(cartBadge).toBeVisible();
     //Click on the add to cart button
     await cartBadge.click();
     await this.page.waitForLoadState('networkidle');
  });

  When('selecting the cart icon the correct product is in the mycart page', async function () {
    // Write code here that turns the phrase above into concrete actions
    const cartProduct = this.page.locator('.inventory_item_name');
    const checkoutBtn = await this.page.locator('button[data-test="checkout"]');
    //Verify that the selected product is available in the
    await cartProduct.textContent();
    await expect(cartProduct).toHaveText("Sauce Labs Onesie");
    await checkoutBtn.click();
    await this.page.waitForLoadState('networkidle');
  });

  Then('Checkout your Information', async function () {
    // Write code here that turns the phrase above into concrete actions
        const checkFirstName = this.page.locator('input[data-test="firstName"]');
        const checkLastName = this.page.locator('input[data-test="lastName"]');
        const checkPostalCode = this.page.locator('input[data-test="postalCode"]');
        const continueBtn = this.page.locator("input[data-test='continue']");
        //Enter Firstname
        await checkFirstName.fill('Jack');
        //Enter Lastname
        await checkLastName.fill('Black');
        //Enter Zip/Postal code
        await checkPostalCode.fill('8000');
        //Click continue button
        await continueBtn.click();
  });

 