class LoginPage {

    constructor(page)
    {
        this.page = page;
        this.signInbutton = page.locator("input[id='login']");
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
    }
    async goTo()
    {
        await this.page.goto('https://rahulshettyacademy.com/client/');
    }
    //creating a method validLogin()
    async validLogin(email,loginPass)
    {
        await this.userName.type(email);
        await this.password.type(loginPass);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = {LoginPage};