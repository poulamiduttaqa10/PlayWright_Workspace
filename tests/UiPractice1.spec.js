const {test,expect}=require('@playwright/test');

test('Practice Login',async ({page})=>{
    const cardTitles=await page.locator('.card-body b');
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('poulami.dutta.qa.10@gmail.com');
    await page.locator('#userPassword').fill('Password@01');
    await page.locator('#login').click();
    //await page.waitForLoadState('networkidle');
    //await cardTitles.first().waitFor();
    //console.log(await cardTitles.allTextContents());
    await expect(cardTitles.first()).toContainText('ADIDAS ORIGINAL');
})

test.only('Practice Add to Cart',async ({page})=>{
    
    const productName="ZARA COAT 3";
    const userEmail="poulami.dutta.qa.10@gmail.com";
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill(userEmail);
    await page.locator('#userPassword').fill('Password@01');
    await page.locator('#login').click();
    //await page.waitForLoadState('networkidle');
    const cardTitles=await page.locator('.card-body b');
    const prod=await page.locator('.card-body');
    await cardTitles.first().waitFor();
    //console.log(await cardTitles.allTextContents());
    
    await expect(cardTitles.first()).toContainText('ADIDAS ORIGINAL');
    const allTitles=await cardTitles.allTextContents();
    console.log(allTitles);
    const prodCount =await prod.count();
    let miniCartCount= 0;
    await  console.log(miniCartCount);
    for(let i=0;i<prodCount;i++){
        await console.log("Hello"+ i);
        await console.log(await cardTitles.nth(i).textContent());
        if(await cardTitles.nth(i).textContent() === productName){
            await prod.nth(i).locator("text=Add To Cart").click();
            await console.log("Product added to cart");
            miniCartCount++;
            break;
        }
    }
    await page.locator("#toast-container div.toast-success").waitFor();
    console.log(miniCartCount);
    await expect(page.locator("#toast-container div.toast-success")).toContainText("Product Added To Cart");
    await expect(page.locator("button[routerlink*='/cart'] label")).toContainText(miniCartCount.toString());    
    //await assertion.locator("button[routerlink*='/cart'] label").toContainText(miniCartCount);
   
   await page.locator("button[routerlink*='/cart']").click();
   await page.locator("div.cartSection h3").first().waitFor();
   const cartProducts=await page.locator("div.cartSection h3");
   const cartProductFound=await page.locator("div.cartSection h3:has-text('"+productName+"')");
   expect(cartProductFound).toBeTruthy();
   await page.locator("text=Checkout").click();
   await page.locator("div .payment__title").first().waitFor();
   await expect(page.locator(".user__name [type='text']").first()).toContainText(userEmail);
   await page.getByPlaceholder('Select Country').pressSequentially('ind',{delay:150});
   await page.locator(".ta-results").first().waitFor();
   const countryOptions=await page.locator(".ta-results button");
   for(let i=0;i<await countryOptions.count();i++){
        if(await countryOptions.nth(i).textContent() === " India"){
            console.log(countryOptions.nth(i).textContent());
            await countryOptions.nth(i).click();
            break;
        }
   }
   const cardDeatils=await page.locator(".field");
   for(let i=0;i<await cardDeatils.count();i++){
        const cardTitle=await cardDeatils.nth(i).locator(".title").textContent();
        console.log(cardTitle);
        switch(await cardTitle){
            case "CVV Code ?":
                console.log("okk");
                await cardDeatils.nth(i).locator("input").fill("123");
                break;
            case "Name on Card ":
                console.log(cardDeatils.nth(i).locator(".title").textContent());
                await cardDeatils.nth(i).locator("input").fill("Poulami Dutta");
                break;
            case "Apply Coupon ":
                await cardDeatils.nth(i).locator("input").fill("rahulshettyacademy");
                await page.locator("button:has-text('Apply Coupon')").click();
                await page.locator(".field .ng-star-inserted").waitFor();
                await console.log(await page.locator(".field .ng-star-inserted").textContent());
                await expect(page.locator(".field .ng-star-inserted")).toContainText("* Coupon Applied");
                break;
        }
   }
   await page.locator("a:has-text('Place Order ')").click();
   await page.locator('h1:has-text("THANKYOU FOR THE ORDER.")').waitFor();
   const orderId= await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
   const trimOrderId=await orderId.split("|")[1].trim();
   console.log(trimOrderId);
   await page.locator("label[routerlink*='myorders']").click();
   //const orderRows=await page.locator(".ng-star-inserted");
   await page.locator("tbody .ng-star-inserted th").first().waitFor();
   for(let i=0;i<await page.locator("tbody .ng-star-inserted th").count();i++){
        console.log(await page.locator("tbody .ng-star-inserted th").nth(i).textContent());
        if(await page.locator("tbody .ng-star-inserted th").nth(i).textContent() === trimOrderId){
            console.log("Order found");
            await page.locator("tbody .ng-star-inserted button").nth(i).click();
            break;
        }
   }
    await page.locator(".email-title").waitFor();
   await expect(page.locator(".email-title")).toContainText(" order summary ");
   await expect(page.locator("div.col-text")).toContainText(trimOrderId);
   await page.pause();
})

test('Ideal ',async ({page})=>{
      //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 
   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
 
   await page.locator("[routerlink*='cart']").click();
   //await page.pause();
 
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
 
   await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
 
   expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
});