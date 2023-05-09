const {test, expect} = require('@playwright/test');
//Execute tests with <npx playwright tests>

test('First PlayWright Test', async ({browser})=> {

    //chrome - plugins/ cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const passWord = page.locator("//input[@id='password']");
    const signIn = page.locator("[name='signin']");
    const errorMessage = page.locator("[style*='block']");
    const cardTitles = page.locator('.card-body a');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //Print title to output    
    console.log(await page.title());
    //Assert the page title to console
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    //Username field
    await userName.type('Brandon');
    //Password field
    await passWord.type('password');
    //SignIn button
    await signIn.click();
    
    //Capturing the Incorrect Username/password blinker message
    console.log(await errorMessage.textContent());
    //Assert and capture the error message text
    await expect(errorMessage).toContainText('Incorrect');

    //Type/Fill
    await userName.fill('rahulshettyacademy');
    await passWord.fill('learning');
    await signIn.click();

    //console.log(await cardTitles.nth(0).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

//				
test('UI Controls', async ({page})=> 
{
	await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const passWord = page.locator("//input[@id='password']");
    const signIn = page.locator("[name='signin']");
    const dropdown = page.locator("select.form-control")
    await dropdown.selectOption("consult");

    //Working with Radio button
    const radioBtn = page.locator('.radiotextsty').nth(1);
    const okayBtn = page.locator("#okayBtn");
    await radioBtn.click();
    await okayBtn.click();
    await expect(radioBtn).toBeChecked();
    console.log(('The User radio button is?'),await radioBtn.isChecked());

    //Working with Check boxes
    const checkBox = page.locator("#terms");
    await checkBox.click();
    expect(await checkBox.isChecked()).toBeTruthy();
    console.log(('The checkbox is?'), await checkBox.isChecked());

    //Working and validating Attributes
    const documentLink = page.locator("[href*='documents-request']");
    await expect(documentLink).toHaveAttribute('class', 'blinkingText');
    console.log('document link is blinking?', await documentLink.isVisible());

}); 

test('New window', async ({browser})=> 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    //Creates a new page and executes tests
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
    ]);

    const text = await newPage.locator('.red').textContent();
    console.log(text);


});