const {test, expect} = require('@playwright/test');

test("Login to application", async ({page})=>
{

    await page.goto("https://www.saucedemo.com/");

    const sauceUserName = page.locator("#user-name");
    const saucePassWord = page.locator("#password");
    const sacueLogin = page.locator("#login-button");

    //Login script
    await sauceUserName.fill("standard_user");
    await saucePassWord.fill("secret_sauce");
    await sacueLogin.click();
    
    const sauceTitle = page.locator(".app_logo");
    await expect(sauceTitle).toHaveText('Swag Labs');
    console.log(await sauceTitle.textContent())

    //This for loop cycles through the products, finds the title of a specific product then selects the add to cart button.
    const sauceCount = await page.locator(".inventory_container .inventory_list .inventory_item .inventory_item_description .inventory_item_name").count()
    for(let i = 0; i < sauceCount; i++){
        if(await page.locator(".inventory_container .inventory_list .inventory_item .inventory_item_description .inventory_item_name").nth(i).textContent() === 'Sauce Labs Onesie')
        {
            await page.locator(".inventory_container .inventory_list .inventory_item .inventory_item_description").nth(i).locator("button").click()
            console.log(await page.locator(".inventory_container .inventory_list .inventory_item .inventory_item_description .inventory_item_name").nth(i).textContent())
            break;
        }
        }
    //Select the Cart Icon and checkout
    const cartIcon = page.locator(".shopping_cart_container");

    await expect(page.locator(".shopping_cart_container .shopping_cart_badge")).toHaveText("1");
    await cartIcon.click();
    await expect(page.locator(".cart_item_label .inventory_item_name")).toHaveText("Sauce Labs Onesie");
    await page.locator("#checkout").click();

    //Checkout: Your information
    await page.locator("#first-name").fill("Sally");
    await page.locator("#last-name").fill("Mc Nutts");
    await page.locator("#postal-code").fill("1001");
    await page.locator("#continue").click()

    //Checkout: Overview
    console.log(await page.locator(".summary_value_label").nth(0).textContent());
    await page.locator("#finish").click();

    //Checkout: Complete!
    await expect(page.locator("#checkout_complete_container h2")).toHaveText("Thank you for your order!");
    await page.locator("#back-to-products").click();

    //Returns to products page
    await expect(sauceTitle).toHaveText('Swag Labs');
    console.log("Landed back on product page: " , sauceTitle);

});