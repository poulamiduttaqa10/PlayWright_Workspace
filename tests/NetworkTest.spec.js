const {test,expect, request }=require('@playwright/test');
const {ApiUtils}=require('./utils/ApiUtils');

const loginPayLoad={
    userEmail: "poulami.dutta.qa.10@gmail.com",
    userPassword: "Password@01"
}
const orderPayLoad={
   orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]
}
const fakeOrderPayLoad={data:[],message:"No Orders"}
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
    await page.goto("https://rahulshettyacademy.com/client");
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
      async route=>{
         const response= await page.request.fetch(route.request());
         const body=JSON.stringify(fakeOrderPayLoad);
         await route.fulfill({
            response,
            body
         });
      }
       //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    );
    
   await page.locator("button[routerlink*='myorders']").click();
    //Request Context Disposed Error- when we are using request context in beforeAll and trying to access that in test, we will get this error because afterAll is executed and request context is disposed, so we need to create a new request context in test and use that to access the response.
   await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
   await console.log("okk polo");
   await console.log(await page.locator('.mt-4').textContent());
   await expect(await page.locator('.mt-4')).toHaveText("You have No Orders to show at this time. Please Visit Back Us");
   //await page.pause();

});