const { test, expect } = require('@playwright/test');
class DashboardPage{
    constructor(page){
        this.page=page;
        this.products= this.page.locator(".card-body");
        this.productsTexts=this.page.locator(".card-body b");
        this.cart=this.page.locator("[routerlink*='cart']");
        this.orders = this.page.locator("button[routerlink*='myorders']");
    }
    async searchProductAndAddToCart(productName){
        
            await this.productsTexts.first().waitFor();
            const titles = await this.productsTexts.allTextContents();
            //console.log(titles);
            const count = await this.products.count();
            for (let i = 0; i < count; ++i) {
                console.log(await this.products.nth(i).locator("b").textContent());
                if (await this.products.nth(i).locator("b").textContent() === productName) {
                    //add to cart
                    //await this.products.nth(i).locator("text= Add To Cart").click();
                    await this.page.locator('button').filter({ hasText: 'Add To Cart' }).nth(i).click();
                    await this.page.waitForLoadState('networkidle');
                    break;
                }
            }
        
    }
    async navigateToCartPage(){
        await this.cart.click();
        await  this.page.locator("div li").first().waitFor();
    }
    async navigateToOrders()
{
    await this.orders.click();
}

}


module.exports={ DashboardPage }