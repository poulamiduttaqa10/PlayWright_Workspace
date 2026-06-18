# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: WebApi1.spec.js >> @API Ideal 
- Location: tests\WebApi1.spec.js:21:1

# Error details

```
Error: apiRequestContext.post: write ECONNRESET
Call log:
  - → POST https://rahulshettyacademy.com/api/ecom/auth/login
    - user-agent: Playwright/1.61.0 (x64; windows 10.0) node/24.15 CI/1
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - content-type: application/json
    - content-length: 74

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - link "Free Access to InterviewQues/ResumeAssistance/Material" [ref=e3] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/documents-request
    - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire" [ref=e4] [cursor=pointer]:
      - /url: https://techsmarthire.com/
  - generic [ref=e5]:
    - heading [level=3] [ref=e6]:
      - img [ref=e8]
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]: "Username:"
        - textbox "Username:" [active] [ref=e17]: rahulshettyacademy.com
      - generic [ref=e18]:
        - generic [ref=e19]: "Password:"
        - textbox "Password:" [ref=e20]
      - generic [ref=e22]:
        - generic [ref=e23] [cursor=pointer]:
          - text: Admin
          - radio "Admin" [checked] [ref=e24]
        - generic [ref=e26] [cursor=pointer]:
          - text: User
          - radio "User" [ref=e27]
      - combobox [ref=e30]:
        - option "Student" [selected]
        - option "Teacher"
        - option "Consultant"
      - generic [ref=e31]:
        - generic [ref=e32]:
          - checkbox "I Agree to the terms and conditions" [ref=e34]
          - generic [ref=e35]:
            - text: I Agree to the
            - link "terms and conditions" [ref=e36] [cursor=pointer]:
              - /url: "#"
        - button "Sign In" [ref=e37] [cursor=pointer]
      - paragraph [ref=e39]:
        - text: (username is
        - generic [ref=e40]: rahulshettyacademy
        - text: and Password is
        - generic [ref=e41]: Learning@830$3mK2
        - text: )
```

# Test source

```ts
  1  | class ApiUtils{
  2  |     constructor(apiContext,loginPayLoad){
  3  |         this.apiContext=apiContext;
  4  |         this.loginPayLoad=loginPayLoad;
  5  |     }
  6  |     async getToken(){
> 7  |     const loginResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
     |                                               ^ Error: apiRequestContext.post: write ECONNRESET
  8  |         data: this.loginPayLoad
  9  |     });
  10 |     //await  expect(await loginResponse.ok()).toBeTruthy();
  11 |     const loginResponseJson= await loginResponse.json();
  12 |     const token=await loginResponseJson.token;
  13 |     //await token = loginResponseJson.token;
  14 |     await console.log(token);
  15 |     return token;
  16 |     }
  17 |     async createOrder(orderPayLoad){
  18 |         const response={};
  19 |         response.token=await this.getToken();
  20 |         const orderResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
  21 |                 data: orderPayLoad,
  22 |                 headers: {
  23 |                  'Authorization': response.token,
  24 |                  'Content-Type': "application/json"
  25 |                 }
  26 |             });
  27 |             const OrderResponseJson=await orderResponse.json();
  28 |             console.log(OrderResponseJson);
  29 |             const orderId=OrderResponseJson.orders[0];
  30 |             console.log(orderId);
  31 |             response.orderId=orderId;
  32 |             return response;
  33 |     }
  34 | }
  35 | module.exports={ApiUtils};
```