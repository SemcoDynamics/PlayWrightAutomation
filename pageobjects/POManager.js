const { DashboardPage1 } = require("./DashboardPage1");
const { LoginPage } = require("./LoginPage");
const { MyCart } = require("./MyCart");

//We can use a Page Object Model to manager all of our Page objects in a sort of library manager.
class POManager
{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage1(this.page);
        this.CartPage = new MyCart(this.page);
    }
    getLoginPage()
    {
        return this.loginPage
    }
    getDashboardPage()
    {
        return this.dashboardPage;
    }
    getMyCartPage()
    {
        return this.CartPage;
    }

}
module.exports = {POManager};