const {test, expect} = require('@playwright/test');
const {SwagLogin_lockedOutUser} = require('../../pageobjects/SwagLabs/Logins/SwagLogin_lockedOutUser');
const {SwagLogin_ProblemUser} = require('../../pageobjects/SwagLabs/Logins/SwagLogin_ProblemUser');
const { emitMetaMessage } = require('@cucumber/cucumber/lib/cli/helpers');
const { SwagLogin_PerformanceGlitchUser } = require('../../pageobjects/SwagLabs/Logins/SwagLogin_PerfomanceGlitchUser');
const { SwagLogin_standardUser } = require('../../pageobjects/SwagLabs/Logins/SwagLogin_standardUser');


//Test suite
test.describe('Invalid user access', async ()=>{
    //----What have I Learnt When creating Page Object Module----
    //Import the library "const {SwagLogin} = require('../pageobjects/SwagLogin');"
    //WHen creating a test script using POM first create a test
    //Then declare the POM I want to use in the test script eg const login = new LoginPage(page)
    //Example const login = new SwagLogin(page); in this case
    //Then call each funtion in the POM with a await

    //test script
    test("standard user", async ({page})=> 
    {   //Declare login POM
        const standardlogin = new SwagLogin_standardUser(page);
        //Login URL
        await standardlogin.goTo();
        //Enter username and password
        await standardlogin.standardLogin(standardlogin.email, standardlogin.password);
        //close page
        await page.close();
    });
    test("Locked out user", async ({page})=> 
    {   //Declare login POM
        const lockedlogin = new SwagLogin_lockedOutUser(page);
        //Login URL
        await lockedlogin.goTo();
        //Enter username and password
        await lockedlogin.lockedLogin(lockedlogin.email, lockedlogin.password);
        //Asserstion validate error.
        await expect(page.locator('h3[data-test="error"]')).toHaveText("Epic sadface: Sorry, this user has been locked out.")
        //close page
        await page.close();
    });
    test('Problem user', async ({page})=>
    {
        const loginProblem = new SwagLogin_ProblemUser(page);
        //Login URL
        await loginProblem.goTo();
        //Enter username and password
        await loginProblem.problemLogin(loginProblem.email, loginProblem.password);
        //Asserstion validate error.
        //close page
        await page.close();
    })
    test('performance_glitch_user', async ({page})=>
    {
        const loginPerformanceGlitch = new SwagLogin_PerformanceGlitchUser(page);
        //Login URL
        await loginPerformanceGlitch.goTo();
        //Enter username and password
        await loginPerformanceGlitch.performanceGlitchLogin(loginPerformanceGlitch.email, loginPerformanceGlitch.password);
        //Asserstion validate error.
        //close page
        await page.close();
    })
});
    