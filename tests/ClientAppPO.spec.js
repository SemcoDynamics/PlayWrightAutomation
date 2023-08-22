const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');
const {PaymentPage} = require('../pageobjects/PaymentPage');
const dataSet = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

test.only("End to End testing", async ({page})=> 
{
    const poManager = new POManager(page);
    //List all products in this locator
    const products = page.locator(".card-body");

    //Sign in process
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(dataSet.username, dataSet.password)
    //Dashboard search product and add it to cart
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(dataSet.productName);
    await dashboardPage.navigateToCart();
    //My Cart page
    const myCartCheckout = poManager.getMyCartPage();
    await myCartCheckout.waitForMyCart();
    await myCartCheckout.clickCheckout();
    //payment page
    const PaymentProcess = new PaymentPage(page);
    await PaymentProcess.personalCardInfo();
    await PaymentProcess.personalCardExpiry();
    await PaymentProcess.countrySelection();
    await PaymentProcess.couponApply();
    await PaymentProcess.placeOrder();

    //left to be refactored
    //Thank message
    expect(await page.locator("tbody h1.hero-primary").textContent())
    console.log("Correct message displays: ", await page.locator("tbody h1.hero-primary").textContent());

    //Capture order number
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    //Order page and match the orderId
    const orderMenu = page.locator("app-sidebar ul li:nth-child(3)");
    await orderMenu.click();
    await page.locator("tbody").waitFor();
    
    const rows = page.locator("tbody tr");
    const rowsCount = await rows.count();
    //The for loop cycles through the order ID selects one then clicks on the view button
    for(let i =0; i < rowsCount; ++i)
    {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId))
      {
        await rows.nth(i).locator("button").first().click();
        break;
      }
     
    }
    await page.waitForLoadState('networkidle')
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
  })