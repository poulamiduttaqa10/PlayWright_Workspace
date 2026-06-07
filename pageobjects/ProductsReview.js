const { test, expect } = require('@playwright/test');
class ProductsReviewPage{
    constructor(page){
        this.page=page;
        this.country=page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        this.email=page.locator(".user__name [type='text']");
        this.placeOrderbtn= page.locator(".action__submit");
        this.orderIdText= page.locator(".em-spacer-1 .ng-star-inserted");
        this.orderHistorypageBtn=page.locator("button[routerlink*='myorders']");
         
    }
    async selectCountryDropdown(country){
        await this.country.pressSequentially(country, { delay: 150 });
            await this.dropdown.waitFor();
            const optionsCount = await this.dropdown.locator("button").count();
            for (let i = 0; i < optionsCount; ++i) {
                const text = await this.dropdown.locator("button").nth(i).textContent();
                if (text === " India") {
                    await this.dropdown.locator("button").nth(i).click();
                    break;
                }
            }
    }
    async verifyEmail(email){
        expect(await this.email.first()).toHaveText(email);
    }
    async placeOrder(){
         await this.placeOrderbtn.click();
         await expect(this.page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    }
    async verifyOrderId(){
    const orderId = await this.orderIdText.textContent();
    console.log(orderId);
    return await orderId;
    }
    async navigateToOrderHistoryPage(){
        await this.orderHistorypageBtn.click();
        await this.page.locator("tbody").waitFor();
    }
}
module.exports= { ProductsReviewPage };