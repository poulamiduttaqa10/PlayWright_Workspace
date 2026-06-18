const {test,expect}=require('@playwright/test');

test("Calendar", async ({page})=>{
    const month="4";
    const year="2024";
    const date="22";
    const dateToSelect=[month,date,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator('.react-date-picker__calendar-button.react-date-picker__button').click();
    //const calBodyVisibleBool=await page.locator(page.locator('.react-calendar')).isVisible();
    //await expect(calBodyVisibleBool).toBeTruthy();
    //await page.locator(page.locator('.react-calendar')).waitFor();
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();
    // const yesrVisibleBool=await page.locator('.react-calendar__decade-view__years__year').filter({hasText:year}).isVisible();
    // while(!yesrVisibleBool){

    // }
    // if(yesrVisibleBool){
    //     await page.locator('.react-calendar__decade-view__years__year').filter({hasText:year}).click();
    // }else{

    // }
    await page.locator('.react-calendar__decade-view__years__year').filter({hasText:year}).click();
    page.locator('.react-calendar__year-view__months__month').nth(month-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();
    for(let i=0;i<dateToSelect.length;i++){
        await expect(await page.locator('.react-date-picker__inputGroup__input').nth(i).inputValue()).toEqual(dateToSelect[i]);
        // page.locator('.react-date-picker__inputGroup__input')
    }
    //await page.pause();
});

test("Calendar validations Ideal",async({page})=>
{
 
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber,date,year];
    
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();
 
    const inputs =  page.locator('.react-date-picker__inputGroup__input')
 
    for(let i =0; i<expectedList.length;i++)
    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
 
    }
});