const {expect} = require('@playwright/test');

class SwagLogin_lockedOutUser {

    constructor(page)
    {
        this.page = page;
        this.userName = page.locator('[data-test="username"]');
        this.passWord = page.locator('[data-test="password"]');
        this.loginBtn = page.locator('[data-test="login-button"]');
        this.email = "locked_out_user"
        this.password = "secret_sauce"
    }
    //URL
    async goTo()
    {
        await this.page.goto("https://www.saucedemo.com/");
    }
    //Invalid login
    async lockedLogin(email,password)
    {
        await this.userName.fill(email);
        await this.passWord.fill(password);
        await this.loginBtn.click();
        await this.page.waitForSelector('h3[data-test="error"]');
    }
 
}
module.exports = {SwagLogin_lockedOutUser};

//What have I Learnt
//WHen creating a POM I must declare the constructor with the page fixture
//WHen declaring variables I must use this.variable when calling the variable
//Declare the page variable this.page = page;