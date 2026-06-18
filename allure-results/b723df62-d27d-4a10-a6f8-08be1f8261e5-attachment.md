# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: NetworkAssignment2.spec.js >> Network Intercept Access Denied
- Location: tests\NetworkAssignment2.spec.js:28:1

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  1  | const { test, expect, request } = require('@playwright/test');
  2  | //const {ApiNetworkUtils}=require('./utils/NetworkAssignmentApiUtils');
  3  | 
  4  | const BASE_URL = "https://api.eventhub.rahulshettyacademy.com";
  5  | const BASE_UI_URL = "https://eventhub.rahulshettyacademy.com";
  6  | const API_URL = BASE_URL + "/api";
  7  | const email_sharklasers="playwright.test2@sharklasers.com";
  8  | const email_mailinator="playwright.test1@mailinator.com";
  9  | const password="Password@01"
  10 | const loginPayLoad_yahoo = { email: email_mailinator, password: password };
  11 | const createBookingPayLoad = {
  12 |     eventId:1,
  13 |     customerName: "Mailinator User",
  14 |     customerEmail: email_mailinator,
  15 |     customerPhone: "+91-9876543210",
  16 |     quantity: 1
  17 | };
  18 | let loginResponseJson;
  19 | let token;
  20 | const loginAs = async (page, GMAIL_USER) => {
  21 |     await page.goto(BASE_UI_URL);
  22 |     console.log(GMAIL_USER);
  23 |     await page.getByPlaceholder('you@email.com').fill(GMAIL_USER);
  24 |     await page.locator('#password').fill(password);
  25 |     await page.locator('#login-btn').click();
  26 |     await page.locator("#nav-events").waitFor();
  27 | }
  28 | test("Network Intercept Access Denied", async ({page}) => {
  29 |     const apiContext = await request.newContext();
  30 |     const loginResponse = await apiContext.post(API_URL + "/auth/login", {
  31 |         data: loginPayLoad_yahoo,
  32 |         contentType: "application/json; charset=utf-8"
  33 |     });
  34 |     await expect(await loginResponse.ok()).toBeTruthy();
  35 |     loginResponseJson = await loginResponse.json();
  36 |     token = await loginResponseJson.token;
  37 |     //console.log(token);
  38 |     //const getApiContext=await request.
  39 |     const eventsResponse = await apiContext.get(API_URL+"/events", {
  40 |         headers: {
  41 |             'Authorization': `Bearer ${token}`,
  42 |             'Content-Type': "application/json"
  43 |         }
  44 |     });
  45 |     await console.log(eventsResponse);
  46 |     await expect(await eventsResponse.ok()).toBeTruthy();
  47 |     const eventsResponseJson = await eventsResponse.json();
  48 |     console.log(eventsResponseJson);
  49 |     const eventId = eventsResponseJson.data[0].id;
  50 |     //console.log(eventId);
  51 | 
  52 |     const eventBookingResponse = await apiContext.post(API_URL+"/bookings", {
  53 |         data: createBookingPayLoad,
  54 |         headers: {
  55 |             'Authorization': `Bearer ${token}`,
  56 |             'Content-Type': "application/json"
  57 |         }
  58 |     });
> 59 |     await expect(await eventBookingResponse.ok()).toBeTruthy();
     |                                                   ^ Error: expect(received).toBeTruthy()
  60 |     const eventBookingResponseJson = await eventBookingResponse.json();
  61 |     console.log(eventBookingResponseJson);
  62 |     const yahooBookingId = eventBookingResponseJson.data.id;
  63 |     console.log("okkkkkkkk");
  64 |     console.log(yahooBookingId);
  65 |     await loginAs(page,email_sharklasers);
  66 |     await page.goto(BASE_UI_URL+"/bookings/"+yahooBookingId);
  67 |     await page.waitForLoadState('networkidle');
  68 |     await expect(page.locator("main h3")).toContainText("Access Denied");
  69 |     //await page.pause();
  70 | });
```