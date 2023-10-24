const {expect} = require('@playwright/test');

class SwagLogin_PerformanceGlitchUser{

    constructor(page)
    {
        this.page = page;
        this.userName = page.locator('[data-test="username"]');
        this.passWord = page.locator('[data-test="password"]');
        this.loginBtn = page.locator('[data-test="login-button"]');
        this.email = "performance_glitch_user";
        this.password = "secret_sauce";
    }
     //URL
     async goTo()
     {
         await this.page.goto("https://www.saucedemo.com/");
     }
     //Problem login
     async performanceGlitchLogin(email,password)
     {
         await this.userName.fill(email);
         await this.passWord.fill(password);
         await this.loginBtn.click();
         await this.page.waitForLoadState("networkidle");
     }
}
module.exports = {SwagLogin_PerformanceGlitchUser}