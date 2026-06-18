const {test,expect}= require('@playwright/test');

test('First PlayWright Test', async ({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator("#username").fill("Poulami");
    await page.locator("[type='password']").fill("learning");
    await page.locator("[name='signin']").click();
    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password."); 
});

test('Second PlayWright Test', async ({page})=>{
   
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username=await page.locator("#username");
    const password = await page.locator("[type='password']");
    const userRadio= await page.locator(".radiotextsty").last();
    const adminRadio= await page.locator(".radiotextsty").first();
    const dropDown= await page.locator("select.form-control");
    const cardTitle= await page.locator(".card-body a");
    await userRadio.click();
    await expect(userRadio).toBeChecked();
    await expect(page.locator("#okayBtn")).toBeVisible();
    await page.locator("#okayBtn").click();
    await adminRadio.click();
    await expect(adminRadio).toBeChecked();
    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await dropDown.selectOption("consult");
    await expect(dropDown).toHaveValue("consult");
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("[name='signin']").click();
    //await page.waitForLoadState()
    console.log(await cardTitle.allTextContents());
});

test('Third PlayWright Test', async ({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const doculink= page.locator('[href*="documents-request"]');
    const username=page.locator("#username");
    
    await expect(doculink).toHaveAttribute('class','blinkingText');
    //const newPage= await context.newPage();
    const [newPage]= await Promise.all([
        context.waitForEvent("page"),
        doculink.click()
    ]);
    //await expect(newPage.locator(".red")).toBeVisible();
    const text= await newPage.locator(".red").textContent();
    console.log(text);
    const arrText=text.split("@");
    const domain=arrText[1].split(" ")[0];
    console.log(domain);
    await username.waitFor();
    await username.fill(domain);
    //await page.pause();
    await expect(username).toHaveValue("rahulshettyacademy.com");
    console.log(await username.inputValue());
});

