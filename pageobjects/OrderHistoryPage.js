const { test, expect } = require('@playwright/test');
class OrderHistoryPage {

    constructor(page) {
        this.page = page;
        this.rows = page.locator("tbody tr");
        this.orderIdDetails = page.locator(".col-text");
    }

    async findPlacedOrderIdAndGoToOrderDeatilsPage(orderId) {

        for (let i = 0; i < await this.rows.count(); ++i) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }
        const orderIdDetailsText = await this.orderIdDetails.textContent();
        expect(await orderId.includes(orderIdDetailsText)).toBeTruthy();
    }
}
module.exports = { OrderHistoryPage }