const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');
const {PaymentPage} = require('../pageobjects/PaymentPage');

test.only("End to End testing", async ({page})=> 
{
    const poManager = new POManager(page);
    //js file-login js, Dashboards
    const productName = 'zara coat 3';
    //List all products in this locator
    const products = page.locator(".card-body");

    //await page.goto("https://rahulshettyacademy.com/client/");
    const email = 'semcodynamic@gmail.com';
    const loginPass = 'P@ssword123!';

    //Sign in process
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(email, loginPass)
    //Dashboard search product and add it to cart
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();
    //My Cart page
    const myCartCheckout = poManager.getMyCartPage();
    await myCartCheckout.waitForMyCart();
    await myCartCheckout.clickCheckout();
    //payment page
    const PaymentProcess = new PaymentPage();
    await PaymentProcess.personalCardExpiry();
    await PaymentProcess.countrySelection();

   /*  //payment page
    //Add credit card details
    const creditCardNumber = "4542 9931 9292 2293";
    const creditCardLocator = page.locator("form .form__cc input[value='4542 9931 9292 2293']") ;
    await creditCardLocator.fill(creditCardNumber,{delay:100});

    //Select Expiry Month
    const expiryMonth = page.locator('form .form__cc div .field.small select.input.ddl:nth-child(2)');
    await expiryMonth.click({delay:100});
    await expiryMonth.selectOption("07");
      
    //Select Expiry day
    const expiryDay =  page.locator('form .form__cc div .field.small select.input.ddl:nth-child(3)')
    await expiryDay.click({delay:100});
    await expiryDay.selectOption("28");

    //CVV Code
    const cVV = page.locator("form .row:nth-child(2) .field.small:nth-child(2) input");
    await cVV.fill("654");

    //Name on card
    await page.locator("form .row:nth-child(3) .field:nth-child(1) input").fill("Jack Black");

    await page.waitForLoadState('networkidle'); */

    //Checkout page
   /*  await page.locator('[placeholder*=Country]').type("South",{delay:100});

    const dropdown1 = page.locator('.ta-results');
    await dropdown1.waitFor();
    const optionsCount = await dropdown1.locator("button").count();
    for(let i = 0; i < optionsCount; ++i)
    {
      const text = await dropdown1.locator("button").nth(i).textContent();
      if(text.trim() === "South Africa")
      {
        //click operation
        await dropdown1.locator("button").nth(i).click();
        break
      }
    } */
    //Apply Coupon
    await page.locator("form .row:nth-child(4) .field:nth-child(1) input").fill("rahulshettyacademy");
    await page.locator("form .row:nth-child(4) .field button").click();
    
    //Place Order
    await page.locator(".actions a.btnn").click();

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