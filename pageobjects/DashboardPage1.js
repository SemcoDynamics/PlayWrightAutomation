class DashboardPage1
{
    constructor(page)
    {
        this.products = page.locator(".card-body");
        this.productText = page.locator('.card-body b');
        this.cart = page.locator('[routerlink="/dashboard/cart"]');
    }
    async searchProductAddCart(productName)
    {
    const titles = await this.products.allTextContents();
    console.log(titles);
    await page.waitForLoadState('networkidle');

    const count = await this.products.count();
    for(let i = 0; i < count; ++i)
    {
    if(await this.products.nth(i).locator("b").textContent() === productName)  
    console.log("Displays Product name equal to i: ", await this.products.nth(i).locator("b").textContent())
    {
        //add to cart
        await this.products.nth(i).locator("text= Add To Cart").click();
        console.log("Add To Cart: Clicked")
        break;
        }
    }
    }
    async navigateToCart()
    {
        await this.cart.click();
    }
}
module.exports = {DashboardPage1};