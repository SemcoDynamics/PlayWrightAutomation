const {test, expect} = require('@playwright/test');

test('Navigate to the Regression lab asset page', async ({page})=> 
{
    trace: 'path/to/trace/file.json' // enable tracing and specify output file
    //Login Variables
	const userNameMix = page.locator('[dmx-validate="userName"]');
    const passWordMix = page.locator('[dmx-validate="password"]');
    const submit = page.locator('button[text="Sign In"]');
    //Open Browser
    await page.goto("https://integration.mixtelematics.com/#/login");
    //get title - assertion
    console.log("Page Title =",await page.title());
    await expect(page).toHaveTitle("MiX Telematics - Login");

    //Login steps
        //Enter value username
        //Enter valid Password
        //Click Submit
    await userNameMix.type('brandon.olckers@mixtelematics.com');
    await passWordMix.type('Dynamic28+^!');
    await submit.click();

    //Finding the Welcome name to assist in loading the page
    const userNameTitle = page.locator('span[ng-show="loggedInProfile"]')
    expect(await userNameTitle.isVisible());
    
    //Waits for all microservices to load on the page
    await page.waitForLoadState('networkidle');

    //Breadcrumb link
    const breadCrumb = page.locator('.miller-selector a span:nth-child(3)');
    await breadCrumb.click();
    
    //CSO locator - CSO-RSA
    const csoRso = page.locator('.column-viewport .column-container .column-resizable a span:nth-child(2)');
    console.log("Should Returns CSO: ", await csoRso.nth(13).isVisible());

    //Active site
    const state = page.locator(".column-viewport .column-container .column-resizable a span:nth-child(2)")

    //Finds the correct RSO by finding the text name then selecting it
    const rsoName = 'CSO-RSA';
    const column1 = await csoRso.count();
    for(let i = 0; i < column1; i++)
    {
        const text1 = await csoRso.nth(i).textContent()
        if(text1.trim() === 'CSO-RSA')
        {
            await csoRso.nth(i).click()
            break;
        }
        
    }
   
    //Site locator - Regression Test Units (DO NOT EDIT or ADD)
    const site = page.locator('.column-viewport .column-container .column-resizable a span:nth-child(2)');
    console.log("Should Returns Site: ", await site.nth(31).isVisible());
 
    const siteName = 'Regression Test Units (DO NOT EDIT or ADD)';
    const column2 = await site.count();
    for(let i = 0; i < column2; i++)
    {
        const text2 = await site.nth(i).textContent()
        if(text2.trim() === 'Regression Test Units (DO NOT EDIT or ADD)')
        {
            await site.nth(i).click()
            break;
        }
        
    }
    //State locator - Active column
    const Active = "ACTIVE"
    const column3 = await state.count();
    for(let i = 0; i < column3; i++)
    {
        const text3 = await state.nth(i).textContent()
        if(text3.trim() === "Active")
        {
            await state.nth(i).click()
            break;
        }
    }

    const selectBtn = page.locator('.pull-right.mr-10 a:nth-child(2)');
    await selectBtn.click();

     expect(await page.locator('div.column .cell.alt .click-cell').nth(0).textContent() === "Integration Regression FM3607i + Streamax C6D AI");
    await page.waitForLoadState('networkidle'); 
    console.log('Integration Regression FM3607i + Streamax C6D AI: ', await page.locator('div.column .cell.alt .click-cell').nth(0).textContent() === "Integration Regression FM3607i + Streamax C6D AI");
    
    const allLastTrips = page.locator('div .column:nth-child(6) .cell.alt');
    console.log(await allLastTrips.allTextContents());
}); 