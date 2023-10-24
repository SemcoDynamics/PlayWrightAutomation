const {test, expect} = require('@playwright/test');
let webContext;

test.beforeAll(async({browser}) => 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName1 = page.locator('#userEmail');
    const passWord1 = page.locator('#userPassword');
    const submit1 = page.locator("input[id='login']")
    const email = 'semcodynamic@gmail.com';
    const loginPass = 'P@ssword123!';

    const title = page.locator('.card-body b');
    const viewBtn = page.locator('button.btn.w-40.rounded i');
    const viewShoePrice = page.locator('.col-lg-6.rtl-text h3');

    await page.goto("https://rahulshettyacademy.com/client/");
    //get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");

    //Credentials
    await userName1.type(email);
    await passWord1.type(loginPass);
    await submit1.click();

    //Prints Product description to Terminal
    await page.waitForLoadState('networkidle');

    //Capture storage state
    await context.storageState({path: 'StateEtc.json'});
    webContext = await browser.newContext({storageState:'StateEtc.json'});
})

test('Login and view Adidas Orignal shoe', async ()=> 
{//js file- Login js, DashboardPage
    const userName1 = page.locator('#userEmail');
    const passWord1 = page.locator('#userPassword');
    const submit1 = page.locator("input[id='login']")
    const email = 'semcodynamic@gmail.com';
    const loginPass = 'P@ssword123!';

    const title = page.locator('.card-body b');
    const viewBtn = page.locator('button.btn.w-40.rounded i');
    const viewShoePrice = page.locator('.col-lg-6.rtl-text h3');
    //Here we are injecting the cookie into the new page.
    const page = await webContext.newPage();

    await page.goto("https://rahulshettyacademy.com/client/");
    //get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");

    //Credentials
    await userName1.type(email);
    await passWord1.type(loginPass);
    await submit1.click();

    //Prints Product description to Terminal
    await page.waitForLoadState('networkidle');
    console.log(await title.allTextContents());

    //Select and view Addidas Orignal product
    
    await viewBtn.nth(1).click();
    console.log(await viewShoePrice.textContent());
}); 
