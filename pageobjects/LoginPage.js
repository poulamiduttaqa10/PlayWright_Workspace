
const { test, expect } = require('@playwright/test');
class LoginPage {
    constructor(page) {
        this.page = page;
        this.signInButton =this.page.locator('[type=submit]');// page.locator("[value='Login']");
        this.userName = this.page.locator("#userEmail");
        this.password = this.page.locator("#userPassword");
        
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