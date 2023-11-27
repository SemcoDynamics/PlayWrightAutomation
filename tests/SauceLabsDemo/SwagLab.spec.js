const {test, expect} = require('@playwright/test');
const {SwagLogin} = require('../../pageobjects/SwagLabs/Logins/SwagLogin_standardUser');

let webContext;

test.beforeAll(async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = 'standard_user';
    const password = 'secret_sauce'
    
    //Going to Sauce demo URL
    await page.goto("https://www.saucedemo.com/");
    //Entering username
    await page.locator('[data-test="username"]').fill(username);
    //Entering passowrd
    await page.locator('[data-test="password"]').fill(password);
    //Clicking button
    await page.locator('[data-test="login-button"]').click();
    //loadstate
    await page.waitForLoadState("networkidle");
    //Capture session storage
    await context.storageState({path: 'swagLabSession.json'})
    webContext = await browser.newContext({storageState:'swagLabSession.json'});
});

test.describe("1.Complete a purchase flow", async () => {
    test("Add a product to cart", async () => 
    {
        //Session state
        const page = await webContext.newPage();
        //URL (Inventory page)
        await page.goto('https://www.saucedemo.com/inventory.html');
        //Locator highlights all products
        const allProducts = page.locator('.inventory_list .inventory_item');
        //Title highlights all product titles
        const productTitle = page.locator('.inventory_item_description .inventory_item_name');
        //Add to Cart button
        const addToCartBtn = page.locator('button.btn');
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
        //Add to cart Icon badge locator
        const cartBadge = page.locator('a.shopping_cart_link span.shopping_cart_badge');
        //Verfies that one item is in the cart.
        await expect(cartBadge).toBeVisible();
        //Click on the add to cart button
        await cartBadge.click();
        await page.waitForLoadState('networkidle');
    })
    test('View product in MyCart', async () => 
    {
        //session state
        const page = await webContext.newPage();
        //URL (Cart page)
        await page.goto('https://www.saucedemo.com/cart.html');
        const cartProduct = page.locator('.inventory_item_name');
        const checkoutBtn = await page.locator('button[data-test="checkout"]');
        //Verify that the selected product is available in the
        await cartProduct.textContent();
        await expect(cartProduct).toHaveText("Sauce Labs Onesie");
        await checkoutBtn.click();
        await page.waitForLoadState('networkidle');
    })
    test('Checkout: Your Information', async ()=>
    {
        //session state
        const page = await webContext.newPage();
        //URL (Checkout page)
        await page.goto('https://www.saucedemo.com/checkout-step-one.html');
        const checkFirstName = page.locator('input[data-test="firstName"]');
        const checkLastName = page.locator('input[data-test="lastName"]');
        const checkPostalCode = page.locator('input[data-test="postalCode"]');
        const continueBtn = page.locator("input[data-test='continue']");
        //Enter Firstname
        await checkFirstName.fill('Jack');
        //Enter Lastname
        await checkLastName.fill('Black');
        //Enter Zip/Postal code
        await checkPostalCode.fill('8000');
        //Click continue button
        await continueBtn.click();
    }) 
    test('Checkout overview', async ()=>
    {
        //session state
        const page = await webContext.newPage();
        //URL (Checkout overview page)
        await page.goto('https://www.saucedemo.com/checkout-step-two.html');
        //Variables
        const overviewProductTitle = page.locator('.inventory_item_name');
        const paymentInfo = page.locator('.summary_value_label:nth-child(2)');
        const shippingInfo = page.locator('.summary_value_label:nth-child(4)');
        const totalPrice = page.locator('.summary_info_label.summary_total_label');
        //Verify that the correct product is available in the cart
        await expect(overviewProductTitle).toHaveText("Sauce Labs Onesie");
        //Verify that the paymentInformation is visable
        await paymentInfo.toBeVisible
        console.log(await paymentInfo.textContent());
        //Verify shipping information is present
        await expect(shippingInfo).toHaveText('Free Pony Express Delivery!');
        console.log(await shippingInfo.textContent());
        //Verify TotalPrice
        await expect(totalPrice).toHaveText('Total: $8.63');
        console.log(await totalPrice.textContent());
        //Click Finish button
        const finishBtn = page.locator('button#finish');
        await finishBtn.click();
        //Verify order has been completed
        const thankYouMsg = page.locator('h2.complete-header');
        await expect(thankYouMsg).toHaveText('Thank you for your order!');
        //Click back to home button
        const backBtn = page.locator('button#back-to-products');
        await backBtn.click();
        await page.waitForLoadState('networkidle');
        //Returns back to product page
        const productTitlePage = page.locator('.header_secondary_container span.title');
        await expect(productTitlePage).toHaveText('Products');
        console.log('Landed on the Product page: ',await productTitlePage.textContent());
    })
    test('Logout', async ()=>
    {
        //Session state
        const page = await webContext.newPage();
        //URL (Checkout overview page)
        await page.goto('https://www.saucedemo.com/inventory.html');
        //Select menu page from handburger icon
        const menuIcon = page.locator('button#react-burger-menu-btn');
        await menuIcon.click({delay:100});
        //Select logout link
        const logout = page.locator('a#logout_sidebar_link');
        await logout.click();
        //Returns to SignIn page
        const swagLogo = page.locator('.login_logo');
        await expect(swagLogo).toHaveText('Swag Labs');
        //Close browser once test is completed
        await webContext.close();
        await page.close()
    });
});
