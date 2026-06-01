const {test,expect}=require('@playwright/test');
test("Morevalidations", async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://www.amazon.in/");
    await page.goBack();
    await page.goForward();
    await page.goBack();
    await page.locator("#hide-textbox").click();
    await expect(await page.locator("#displayed-text")).toBeHidden();
    await page.locator("#show-textbox").click();
    await expect(await page.locator("#displayed-text")).toBeVisible();
    await page.pause();
    page.on("dialog",dialog=>dialog.accept());
    //page.on("dialog",dialog=>dialog.dismiss());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();

    const iframe=await page.frameLocator("#courses-iframe");
    await iframe.locator("li a[href*='lifetime-access']:visible").click();
    const cust=await iframe.locator(".text h2").textContent();
    console.log(cust.split(" ")[1]);
})