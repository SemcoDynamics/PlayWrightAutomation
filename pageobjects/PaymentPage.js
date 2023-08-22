class PaymentPage {
    constructor(page)
    {
        this.page = page;
        //personalCardInfo()
        this.creditCardLocation = page.locator("form .form__cc input[value='4542 9931 9292 2293']")
        this.creditCardValue = "4542 9931 9292 2293"
        //personalCardExpiry()
        this.expiryM = page.locator('.form__cc div .field.small select.input.ddl:nth-child(2)');
        this.expiryD = page.locator('form .form__cc div .field.small select.input.ddl:nth-child(3)');
        this.cVv = page.locator("form .row:nth-child(2) .field.small:nth-child(2) input");
        //countrySelection()
        this.cardName = page.locator("form .row:nth-child(3) .field:nth-child(1) input");
        this.countrySelect = page.locator('[placeholder*=Country]');
        //couponApply()
        this.couponTextbox = page.locator("form .row:nth-child(4) .field:nth-child(1) input");
        this.ApplyCoupon = page.locator("form .row:nth-child(4) .field button");
        //PlaceOrder
        this.placeOrderBtn = page.locator(".actions a.btnn");
    }
    async personalCardInfo()
    {
        //Selecting credit card locator and filling in the credit card number, with a delay of 100
        await this.creditCardLocation.fill(this.creditCardValue,{delay:100});
    }
    async personalCardExpiry()
    {
        //Select Expiry Month
        await this.expiryM.click({delay:100});
        await this.expiryM.selectOption("07");
        //Select Expiry day
        await this.expiryD.click({delay:100});
        await this.expiryD.selectOption("28");
        //CVV
        await this.cVv.fill("654");    
        //name on card
        await this.cardName.fill('Jack Black');
    }   
    async countrySelection()
    {
        //Checkout button
        this.countrySelect.type("South",{delay:100});
        const dropdown1 = this.page.locator('.ta-results');
        await dropdown1.waitFor();
        const optionsCount = await dropdown1.locator("button").count();
        for(let i = 0; i < optionsCount; ++i)
        {
            const text = await dropdown1.locator("button").nth(i).textContent();
            if(text.trim() === "South Africa")
      {
        //click operation
        await dropdown1.locator("button").nth(i).click();
        break
      }
    }
    }
    async couponApply()
    {
        await this.couponTextbox.fill("rahulshettyacademy");
        await this.ApplyCoupon.click();
    }
    async placeOrder()
    {
        await this.placeOrderBtn.click();
    }
}
module.exports = {PaymentPage};