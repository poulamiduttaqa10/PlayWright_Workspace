const { test: base } = require('@playwright/test');
exports.customTest = base.extend(
    {
        testDataForOrder: {
            email: "playwright.test1@mailinator.com",
            productName: "ZARA COAT 3",
            password: "Password@01",
            country: "Ind"
        }
    }
)