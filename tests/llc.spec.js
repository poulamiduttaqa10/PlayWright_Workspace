const {test,expect}=require('@playwright/test');
test('LLC Test',async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByText("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("learning");
    await page.getByRole("button",{name:"Submit"}).click();
    await expect(await page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();
    await page.getByRole("link",{name:"Shop"}).click();
    await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole("button").click();
    await page.pause();
});