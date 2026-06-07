
const { test, expect } = require('@playwright/test');
class LoginPage {
    constructor(page) {
        this.signInButton = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.page = page;
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");

    }
    async validLogin(email, password) {
        await this.userName.fill(email);
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { LoginPage };