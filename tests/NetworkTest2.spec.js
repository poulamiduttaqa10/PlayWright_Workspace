const { test, expect } = require('@playwright/test');

const email = "poulami.test1@mailinator.com";
let webContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Password@01");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' });
    webContext=await  browser.newContext({storageState: 'state.json'});
});

test("Network Intercept1",async()=>{
    const page=await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("[routerlink*=myorders]").click();
    await page.locator("h1:has-text('Your Orders')").waitFor();
    
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", 
        async route=>route.continue({
            url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a1dd32d17ee3e78bab06cb1"
            
        }))
        await page.locator("button.btn.btn-primary").first().click();
        await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
});