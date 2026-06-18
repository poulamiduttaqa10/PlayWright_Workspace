# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: NetworkTest.spec.js >> Ideal 
- Location: tests\NetworkTest.spec.js:20:1

# Error details

```
Test timeout of 50000ms exceeded.
```

```
Tearing down "context" exceeded the test timeout of 50000ms.
```

```
Fixture "trace recording" timeout of 50000ms exceeded during teardown.
```

```
Error: locator.click: Test ended.
Browser logs:

<launching> C:\Users\poula\AppData\Local\ms-playwright\chromium_headless_shell-1228\chrome-headless-shell-win64\chrome-headless-shell.exe --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-client-side-phishing-detection --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-edgeupdater --disable-extensions --disable-features=AvoidUnnecessaryBeforeUnloadCheckSync,BoundaryEventDispatchTracksNodeRemoval,DestroyProfileOnBrowserClose,DialMediaRouteProvider,GlobalMediaControls,HttpsUpgrades,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,Translate,AutoDeElevate,RenderDocument,OptimizationHints,msForceBrowserSignIn,msEdgeUpdateLaunchServicesPreferredVersion --enable-features=CDPScreenshotNewSurface --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --force-color-profile=srgb --metrics-recording-only --no-first-run --password-store=basic --use-mock-keychain --no-service-autorun --export-tagged-pdf --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --edge-skip-compat-layer-relaunch --disable-infobars --disable-search-engine-choice-screen --disable-sync --enable-unsafe-swiftshader --headless --hide-scrollbars --mute-audio --blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4 --no-sandbox --user-data-dir=C:\Users\poula\AppData\Local\Temp\playwright_chromiumdev_profile-hWcKHC --remote-debugging-pipe --no-startup-window
<launched> pid=10300
[pid=10300][err] [0616/221643.775:ERROR:gpu\ipc\client\command_buffer_proxy_impl.cc:285] ContextResult::kTransientFailure: Failed to send GpuControl.CreateCommandBuffer.
[pid=10300][err] [0616/221648.148:INFO:CONSOLE:1] "[ngx-spinner]: Property "type" is missed. Please, provide animation type to <ngx-spinner> component
[pid=10300][err]         and ensure css is added to angular.json file", source: https://rahulshettyacademy.com/client/342.9e55d8a34323d7dafdac.js (1)
[pid=10300][err] [0616/221649.285:INFO:CONSOLE:1] "0", source: https://rahulshettyacademy.com/client/135.4782aab7a591d79cf5e5.js (1)
[pid=10300][err] [0616/221649.632:INFO:CONSOLE:1] "1", source: https://rahulshettyacademy.com/client/135.4782aab7a591d79cf5e5.js (1)
[pid=10300][err] [0616/221649.908:INFO:CONSOLE:1] "2", source: https://rahulshettyacademy.com/client/135.4782aab7a591d79cf5e5.js (1)
[pid=10300] <gracefully close start>
Call log:
  - waiting for locator('button[routerlink*=\'myorders\']')
    - locator resolved to <button tabindex="0" _ngcontent-dak-c33="" class="btn btn-custom" routerlink="/dashboard/myorders">…</button>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling

```

# Test source

```ts
  1  | const {test,expect, request }=require('@playwright/test');
  2  | const {ApiUtils}=require('../utils/ApiUtils');
  3  | 
  4  | const loginPayLoad={
  5  |     userEmail: "poulami.dutta.qa.10@gmail.com",
  6  |     userPassword: "Password@01"
  7  | }
  8  | const orderPayLoad={
  9  |    orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]
  10 | }
  11 | const fakeOrderPayLoad={data:[],message:"No Orders"}
  12 | let response;
  13 | test.beforeAll(async ()=>{
  14 |    //login
  15 |     const apiContext=await request.newContext();
  16 |     const apiUtils=new ApiUtils(apiContext,loginPayLoad);
  17 |     response=await apiUtils.createOrder(orderPayLoad);
  18 | });
  19 | 
  20 | test('Ideal ',async ({page})=>{
  21 |       //js file- Login js, DashboardPage
  22 |   
  23 | 
  24 | //    await page.locator("#userEmail").fill(email);
  25 | //    await page.locator("#userPassword").fill("Iamking@000");
  26 | //    await page.locator("[value='Login']").click();
  27 |     page.addInitScript(value=>{
  28 |         window.localStorage.setItem('token',value);
  29 |     },response.token);
  30 |     await page.goto("https://rahulshettyacademy.com/client");
  31 |     await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
  32 |       async route=>{
  33 |          const response= await page.request.fetch(route.request());
  34 |          const body=JSON.stringify(fakeOrderPayLoad);
  35 |          await route.fulfill({
  36 |             response,
  37 |             body
  38 |          });
  39 |       }
  40 |        //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
  41 |     );
  42 |     
> 43 |    await page.locator("button[routerlink*='myorders']").click();
     |                                                         ^ Error: locator.click: Test ended.
  44 |     //Request Context Disposed Error- when we are using request context in beforeAll and trying to access that in test, we will get this error because afterAll is executed and request context is disposed, so we need to create a new request context in test and use that to access the response.
  45 |    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
  46 |    await console.log("okk polo");
  47 |    await console.log(await page.locator('.mt-4').textContent());
  48 |    await expect(await page.locator('.mt-4')).toHaveText("You have No Orders to show at this time. Please Visit Back Us");
  49 |    //await page.pause();
  50 | 
  51 | });
```