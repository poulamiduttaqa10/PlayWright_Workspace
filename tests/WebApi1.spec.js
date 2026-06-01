const {test,expect, request }=require('@playwright/test');
const {ApiUtils}=require('./utils/ApiUtils');

const loginPayLoad={
    userEmail: "poulami.dutta.qa.10@gmail.com",
    userPassword: "Password@01"
}
const orderPayLoad={
   orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]
}
// let token;
// let orderId;
let response;
test.beforeAll(async ()=>{
   //login
    const apiContext=await request.newContext();
    const apiUtils=new ApiUtils(apiContext,loginPayLoad);
    response=await apiUtils.createOrder(orderPayLoad);
});

test('Ideal ',async ({page})=>{
      //js file- Login js, DashboardPage
  

//    await page.locator("#userEmail").fill(email);
//    await page.locator("#userPassword").fill("Iamking@000");
//    await page.locator("[value='Login']").click();
    page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
    },response.token);
   // const email = "poulami.dutta.qa.10@gmail.com";
   // const productName = 'ZARA COAT 3';
    await page.goto("https://rahulshettyacademy.com/client");
   // const products = page.locator(".card-body");
   // await page.waitForLoadState('networkidle');
   // await page.locator(".card-body b").first().waitFor();
   // const titles = await page.locator(".card-body b").allTextContents();
   // console.log(titles); 
   // const count = await products.count();
   // for (let i = 0; i < count; ++i) {
   //    if (await products.nth(i).locator("b").textContent() === productName) {
   //       //add to cart
   //       await products.nth(i).locator("text= Add To Cart").click();
   //       break;
   //    }
   // }
 
   // await page.locator("[routerlink*='cart']").click();
   // //await page.pause();
 
   // await page.locator("div li").first().waitFor();
   // const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   // expect(bool).toBeTruthy();
   // await page.locator("text=Checkout").click();
 
   // await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
   // const dropdown = page.locator(".ta-results");
   // await dropdown.waitFor();
   // const optionsCount = await dropdown.locator("button").count();
   // for (let i = 0; i < optionsCount; ++i) {
   //    const text = await dropdown.locator("button").nth(i).textContent();
   //    if (text === " India") {
   //       await dropdown.locator("button").nth(i).click();
   //       break;
   //    }
   // }
   // //await page.locator(".user__name [type='text']").first().waitFor();
   // expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   // await page.locator(".action__submit").click();
   // await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   // const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   // console.log(orderId);
 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (response.orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(response. orderId.includes(orderIdDetails)).toBeTruthy();
});