class DashboardPage
{
    constructor(page)
    {
        this.products = page.locator(".card-body");
        this.productsText = page.locator('.card-body b');
        this.cart = page.locator("[routerlink*=''cart]");
    }
//Creating custom methods
    searchProduct(productName)
}