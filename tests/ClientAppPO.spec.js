const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
const { customTest } = require('../utils/test-base');
const dataset = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')));


for (const data of dataset) {
    test(`Client App Login For ${data.productName}`, async ({ page }) => {
        //js file- Login js, DashboardPage

        const poManager = new POManager(page);
        const loginPage = poManager.getLoginpage();
        await (await loginPage).goTo();
        await (await loginPage).validLogin(data.email, data.password);

        const dashboardPage = poManager.getDashboardpage();
        await (await dashboardPage).searchProductAndAddToCart(data.productName);
        await (await dashboardPage).navigateToCartPage();

        const cartPage = poManager.getCartpage();
        await (await cartPage).VerifyProductIsDisplayed(data.productName);
        await (await cartPage).Checkout();

        const productsReviewPage = poManager.getProductsReviewpage();
        await (await productsReviewPage).selectCountryDropdown(data.country);
        await (await productsReviewPage).verifyEmail(data.email);
        await (await productsReviewPage).placeOrder();

        const orderId = await (await productsReviewPage).verifyOrderId();
        await (await productsReviewPage).navigateToOrderHistoryPage();

        const orderHistorypage = poManager.getOrderHistoryPage();
        await (await orderHistorypage).findPlacedOrderIdAndGoToOrderDeatilsPage(orderId);

    });
}

customTest("Client App Login For Fixtures", async ({ page, testDataForOrder}) => {
        //js file- Login js, DashboardPage

        const poManager = new POManager(page);
        const loginPage = poManager.getLoginpage();
        await (await loginPage).goTo();
        await (await loginPage).validLogin(testDataForOrder.email, testDataForOrder.password);

        const dashboardPage = poManager.getDashboardpage();
        await (await dashboardPage).searchProductAndAddToCart(testDataForOrder.productName);
        await (await dashboardPage).navigateToCartPage();

        const cartPage = poManager.getCartpage();
        await (await cartPage).VerifyProductIsDisplayed(testDataForOrder.productName);
        await (await cartPage).Checkout();
});