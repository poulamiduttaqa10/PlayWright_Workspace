const { test, expect, request } = require('@playwright/test');
//const {ApiNetworkUtils}=require('./utils/NetworkAssignmentApiUtils');

const BASE_URL = "https://api.eventhub.rahulshettyacademy.com";
const BASE_UI_URL = "https://eventhub.rahulshettyacademy.com";
const API_URL = BASE_URL + "/api";
const email_sharklasers="playwright.test2@sharklasers.com";
const email_mailinator="playwright.test1@mailinator.com";
const password="Password@01"
const loginPayLoad_yahoo = { email: email_mailinator, password: password };
const createBookingPayLoad = {
    eventId:1,
    customerName: "Mailinator User",
    customerEmail: email_mailinator,
    customerPhone: "+91-9876543210",
    quantity: 1
};
let loginResponseJson;
let token;
const loginAs = async (page, GMAIL_USER) => {
    await page.goto(BASE_UI_URL);
    console.log(GMAIL_USER);
    await page.getByPlaceholder('you@email.com').fill(GMAIL_USER);
    await page.locator('#password').fill(password);
    await page.locator('#login-btn').click();
    await page.locator("#nav-events").waitFor();
}
test("Network Intercept Access Denied", async ({page}) => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post(API_URL + "/auth/login", {
        data: loginPayLoad_yahoo,
        contentType: "application/json; charset=utf-8"
    });
    await expect(await loginResponse.ok()).toBeTruthy();
    loginResponseJson = await loginResponse.json();
    token = await loginResponseJson.token;
    //console.log(token);
    //const getApiContext=await request.
    const eventsResponse = await apiContext.get(API_URL+"/events", {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json"
        }
    });
    await console.log(eventsResponse);
    await expect(await eventsResponse.ok()).toBeTruthy();
    const eventsResponseJson = await eventsResponse.json();
    console.log(eventsResponseJson);
    const eventId = eventsResponseJson.data[0].id;
    //console.log(eventId);

    const eventBookingResponse = await apiContext.post(API_URL+"/bookings", {
        data: createBookingPayLoad,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json"
        }
    });
    await expect(await eventBookingResponse.ok()).toBeTruthy();
    const eventBookingResponseJson = await eventBookingResponse.json();
    console.log(eventBookingResponseJson);
    const yahooBookingId = eventBookingResponseJson.data.id;
    console.log("okkkkkkkk");
    console.log(yahooBookingId);
    await loginAs(page,email_sharklasers);
    await page.goto(BASE_UI_URL+"/bookings/"+yahooBookingId);
    await page.waitForLoadState('networkidle');
    await expect(page.locator("main h3")).toContainText("Access Denied");
    //await page.pause();
});