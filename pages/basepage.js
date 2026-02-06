const { expect } = require("@playwright/test");

class BasePage {
    constructor(page) {
        this.page = page;
        // Global Menu Locators
        this.menuBtn = page.getByRole('button', { name: 'Open Menu' });
        this.resetAppStateLink = page.getByRole('link', { name: 'Reset App State' });
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async openApp() {
        await this.page.goto("https://www.saucedemo.com/");
    }

    async resetApplicationState() {
        await this.menuBtn.click();
        await this.resetAppStateLink.click();
    }

    async verifyUrl(regex) {
        await expect(this.page).toHaveURL(regex);
    }
}
module.exports = BasePage;