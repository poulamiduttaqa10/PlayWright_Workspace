const { test, expect } = require('@playwright/test');
test("test",async ({page})=>{
 await page.goto("https://eventhub.rahulshettyacademy.com/login");
 await page.getByPlaceholder("you@email.com").fill("poulami.dutta.qa.10@gmail.com");
 await page.getByLabel("password").fill("ItsRaining@1");
 await page.locator("#login-btn").click();
 const login= await page.locator("a").filter({hasText:"Browse Events →"});
 await login.waitFor();
 await expect(await login).toBeVisible();

 //step2
 await page.getByRole("button",{name:'Admin'}).click();
 await page.locator("a.items-center").filter({hasText:'Manage Events'}).click();
 const title=Date.now().toString();
 await page.locator("#event-title-input").fill(title);
 await page.locator("#admin-event-form textarea").fill("This is an event created by Playwright Automation");
 await page.getByLabel("City").fill("Kolkata");
 await page.getByLabel("Venue").fill("Salt Lake");
  await page.locator("input[type='datetime-local']").click();
//  await page.getByRole('textbox', { name: 'Price ($)*' }).fill("100");
//  await page.getByRole('textbox', { name: 'Total Seats*' }).fill("50");
//  await page.locator("#add-event-btn").click();
//  await page.locator("p").filter({hasText:"Event created!"}).waitFor();
//  await expect(page.locator("p").filter({hasText:"Event created!"})).toBeVisible();
//  await expect(page)
futureDateValue(1);

//await page.pause();
});

function futureDateValue(daysAhead = 1) {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  console.log(date.toISOString());
  const futureDate=date.toISOString().split('T')[0];
  const futureTime=date.toISOString().split('T')[1].split('.')[0];

  console.log(futureTime);
  const futureyear=futureDate.split("-")[0];
  const futureMonth=futureDate.split("-")[1];
  const futureDay=futureDate.split("-")[2];
  const futureDateRev=`${futureDay}-${futureMonth}-${futureyear}`;
  console.log(futureDateRev);
  console.log(date.toISOString().split('T')[0]);
  //return date.toISOString().split('T')[0]; // "YYYY-MM-DD"
  //futureDateRev.set
}